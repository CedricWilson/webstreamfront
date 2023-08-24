import "./directory_page.css";
import { getPath, setAlbumArt } from "./functions.js";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ListItem from "../list_item/list_item";
import Navbar from "../nav_bar/nav_bar";
import { getServerAddress } from "../utils";

export default function DirectoryPage() {
  const [list, setList] = useState([]);
  const { path } = useParams();
  const [view, setView] = useState(window.folderViewType);

  useEffect(() => {
    fetchDirs();
  }, [path]);

  async function fetchDirs() {
    let basePath = getServerAddress() + "/listings?dir=.";
    if (typeof path != "undefined") {
      basePath = basePath + "/" + getPath(path);
    }

    try {
      const response = await fetch(basePath);
      let data = await response.json();
      data = setAlbumArt(data);
      setList(data);
    } catch (e) {
      console.log(e);
    }
  }

  if (typeof list == "undefined" || list.length == 0) {
    return <p color="white">Loading..</p>;
  }
  return (
    <div className="scroll">
      <Navbar view={view} setView={setView} />
      <ListView list={list} path={path} view={view} />;
    </div>
  );
}

function ListView(props) {
  let list = [];
  if (typeof props.path != "undefined") {
    let body = JSON.parse(props.path);
    list = body;
  }
  return (
    <>
      <div className="grid-container">
        {props.list.map((e, i) => {
          if (e.type == "folder") {
            return (
              // <a href="/test" key={i}>
              <a href={`/${JSON.stringify([...list, e.file_name])}`} style={{ textDecoration: "none" }} key={i}>
                <ListItem item={e} view={props.view} pathList={list}></ListItem>
              </a>
            );
          } else {
            return (
              <a href={getServerAddress() + "/static" + e.file_path} style={{ textDecoration: "none" }} key={i}>
                <ListItem item={e} view={props.view} pathList={list}></ListItem>
              </a>
            );
          }
        })}
      </div>
    </>
  );
}


// Link to