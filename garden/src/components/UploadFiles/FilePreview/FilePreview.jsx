import React, { useState } from "react";
import axios from "../../../axios/config"
import classes from "./FilePreview.module.css";
import Tooltip from "@material-ui/core/Tooltip";

const FilePreview = (props) => {
  const remove = async () => {
    if (props.fileName !== null) {
      try {
        await axios.post("/api/delete-files", {
          fileName: props.fileName,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className={classes.FilePreview}>
      <div className={classes.preview_wrapper}>
        <div className={classes.preview}>
          {
            {
              image: (
                <img className={classes.previewItem} src={props.filePath} />
              ),
              video: (
                <video className={classes.previewItem} src={props.filePath} />
              ),
            }[props.fileExt]
          }
          <div>
            {props.fileInfo}
          </div>
          <div className={classes.removeFile}>
            <Tooltip arrow title="Удалить файл">
              <span
                className={classes.cross}
                onClick={() => {
                  props.update();
                  remove();
                }}
              >
                X
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
