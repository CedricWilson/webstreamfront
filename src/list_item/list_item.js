import { getServerAddress } from "../utils";
import "./list_item.css";
import "font-awesome/css/font-awesome.min.css";
import LazyImage from "./image_container";

export default function ListItem(props) {
  // let isImage = props.view === "long-grid";
  let isImage = false;

  if (typeof props.item.file_path != "undefined" && props.item.file_path != "" && props.item.file_path.includes(".jpg")) {
    isImage = true;
  }

  return (
    <>
      <div className="grid-item" style={{ height: isImage ? "400px" : "150px" }}>
        {isImage ? getAlbumFolder(props.item) : getDefaultFolder(props.item)}
      </div>
    </>
  );
}
function getAlbumFolder(item) {
  let path = getServerAddress() + "/static" + item.file_path;
  return <LazyImage src={path} />;
}

function getDefaultFolder(item) {
  let isFolder = item.type == "folder";
  return (
    <>
      {isFolder ? <i className="fa fa-folder" style={{ fontSize: "36px", color: "#5f6368" }}></i> : <i className="fa fa-file" style={{ fontSize: "36px", color: "#5f6368" }}></i>}
      <p className="grid-text">{item.file_name}</p>
    </>
  );
}
