import React from "react";
import ImageUploader from "react-images-upload";
import Resizer from "react-image-file-resizer";
class UploadComponent extends React.Component {
  onDrop = (pictureFiles, pictureDataURLs) => {
    const newImagesUploaded = pictureDataURLs.slice(
      this.props.defaultImages.length
    );
    
    // const newResizedImagesUploaded=this.resizeFile(newImagesUploaded);
    console.warn("pictureDataURLs =>", newImagesUploaded);
    this.props.handleChange(newImagesUploaded);
  };
   resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      100,
      100,
      "JPEG",
      100,
      0,
      (uri) => {
        console.log("uri image", uri.height);
        resolve(uri);
      },
      "file"
    );
  });
  render() {
    return (
      <ImageUploader
        withIcon={false}
        withLabel={false}
        withPreview={true}
        buttonText={"Add photos"}
        fileSizeError={"File size is too big!"}
        fileTypeError={"This extension is not supported!"}
        onChange={this.onDrop}
        imgExtension={this.props.imgExtension}
        maxFileSize={this.props.maxFileSize}
        defaultImages={this.props.defaultImages}
      />
    );
  }
}

export default UploadComponent;
