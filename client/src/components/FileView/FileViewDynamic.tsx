import dynamic from "next/dynamic";

const FileViewDynamic = dynamic(() => import("./FileView"), {
  ssr: false,
});

export default FileViewDynamic;
