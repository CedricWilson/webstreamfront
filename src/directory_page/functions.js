export function setAlbumArt(data) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].type == "folder") {
      for (let j = data.length - 1; j >= 0; j--) {
        if (data[j].type == "file" && data[j].file_name.substring(0, data[j].file_name.length - 4) == data[i].file_name) {
          data[i].file_path = data[j].file_path;
          data.splice(j, 1);
        }
      }
    }
  }
  return data;
}

export function getPath(path) {
  let p = "";
  let body = JSON.parse(path);
  body.map((e) => {
    p = p + e + "/";
  });
  return p;
}

export function getPath2(window) {
  const queryParams = new URLSearchParams(window.location.search);

  // Access the value of the 'param' parameter
  var params = queryParams.get("path");
  if (params === null){
    return "";
  }
  return params;
}