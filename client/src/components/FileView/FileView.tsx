import React from "react";
import { Box, Button } from "@mui/material";
//@ts-ignore
import FileViewer from "react-file-viewer";
import { IFile } from "types/item";

type Props = {
  attachment: IFile;
};

const FileView = ({ attachment }: Props) => {
  return (
    <>
      <a href={`http://localhost:8001/${attachment.name}`} download>
        <Button variant="outlined">Скачать</Button>
      </a>
      <Box overflow={"auto"} maxHeight={300}>
        <FileViewer
          fileType={attachment.path?.split(".").pop()}
          filePath={`http://localhost:8001/${attachment.path}`}
          onError={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e)}
        />
      </Box>
    </>
  );
};

export default FileView;
