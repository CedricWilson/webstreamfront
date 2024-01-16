import "./directory_page.css";
import { getPath2, setAlbumArt } from "./functions.js";

import { useEffect, useState } from "react";
import ListItem from "../list_item/list_item";
import { getServerAddress } from "../utils";

export default function DirectoryPage() {
  const [list, setList] = useState([]);
  const [path, setPath] = useState("");

  useEffect(() => {
    fetchDirs();
  }, []);

  async function fetchDirs() {
    let basePath = getServerAddress() + "/listings?dir=.";
    var p = getPath2(window);
    setPath(p);
    basePath = basePath + "/" + p;

    console.log(basePath);

    try {
      const response = await fetch(basePath);
      if (response.status === 200) {
        let data = await response.json();
        data = setAlbumArt(data);
        setList(data);
      } else {
        console.log(response.status + response.json());
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (typeof list == "undefined" && list.length === 0) {
    return <p color="white">Loading..</p>
  }
  if (list.length === 0) {
    return <p color="white">Empty directory</p>
  }
  return (
    <div className="scroll">
      <ListView list={list} path={path} />
    </div>
  );
}

function ListView(props) {

  if (props.list.length === 0) {
    return <div />;
  }
  return (
    <>
      <div className="grid-container">
        {props.list.map((e, i) => {
          if (e.type === "folder") {
            return (
              <a href={`/?path=${props.path + e.file_name}/`} style={{ textDecoration: "none" }} key={i}>
                <ListItem item={e} ></ListItem>
              </a>
            )
          } else {
            return (
              <a href={getServerAddress() + "/static" + e.file_path} style={{ textDecoration: "none" }} key={i}>
                <ListItem item={e} ></ListItem>
              </a>
            )
          }
        })}
      </div>
    </>
  )
}