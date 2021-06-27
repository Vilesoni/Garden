import React, { useState } from "react";
import axios from "../../../axios/config"
import classes from "./FilePreview.module.css";
import Tooltip from "@material-ui/core/Tooltip";

const FilePreview = (props) => {
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
