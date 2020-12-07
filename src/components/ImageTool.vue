<template>
  <div id="app">
    <div class="container image-tool mb-3">
      <div class="row justify-content-center">
        <!--UPLOAD-->
        <div class="col-8 col-sm-6 col-md-5 col-lg-4 text-center">
          <div :id="imageContainer" id="imageContainer" class="text-center">
            <img :id="userImage" id="userImage" v-auth-image="this.$server + '/user/image'" class="img-fluid">
          </div>
          <form enctype="multipart/form-data" novalidate>
            <div class="dropbox mt-2">
              <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files);"
                accept="image/*" class="input-file">
                <p v-if="isInitial">
                  Upload image
                </p>
                <p v-if="isSaving">
                  Uploading files...
                </p>
                <p v-if="isSuccess">
                  Upload image
                </p>
                <p v-if="isFailed">
                  Upload image
                </p>
            </div>
          </form>
          <div class="mt-2 d-grid">
            <button id="removeImageButton" v-on:click="removeImage()" class="btn btn-lg btn-danger">Remove image</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from "@/js/spinner.js"
let upload = function(formData) {
    let url = this.$server + '/user/image/post';

    const headers = {
        'Content-Type': 'application/json'
    }
    
    return this.$http.post(url, formData, {
        headers
        })// get data
        .then(x => {
          console.log('nii')
          location.reload();
        })
}


document.getElementsByTagName("body")[0].addEventListener("change", function (event){
  console.log(event)
  console.log('change')
})

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'ImageTool',
  data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos',
        imageContainer: '',
        userImage: '',
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      spinner,
      upload,
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        this.upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      },
      removeImage: function (){
        console.log('click')
        let url = this.$server + '/user/image/delete';
        spinner(removeImageButton)
        
        this.$http.delete(url).then(res => {
          console.log(res)
          spinner(removeImageButton, 'Remove image')
          let imgPath = require('../assets/avatar.jpg')
          imageContainer.innerHTML = "<img src='" + imgPath +"' class='img-fluid'>"
        })
      }
    },
    mounted() {
      this.reset();
    },
};
</script>
<style>
  .dropbox {
    background: lightcyan;
    color: dimgray;
    padding: 0;
    height: 50px;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5); 
    box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5);
    transition: 0.2s;
  }

  .input-file {
    opacity: 0;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    position: absolute;
    cursor: pointer;
    transition: 0.2s;
  }
  .input-file:hover {
    cursor: pointer;
    transition: 0.2s;
  }
    input[type=file]::-webkit-file-upload-button {
    cursor: pointer;
    transition: 0.2s;
  }

  input[type=file]::file-selector-button {
    cursor: pointer;
    transition: 0.2s;
  }

  input[type=file]::-webkit-file-upload-button:hover {
    cursor: pointer;
    transition: 0.2s;
  }
  
  input[type=file]::file-selector-button:hover {
    cursor: pointer;
    transition: 0.2s;
  }

  .dropbox:hover {
    background: lightblue;
    cursor: pointer;
    transition: 0.2s;
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 0;
    padding-top: 10px;
    transition: 0.2s;
  }

  .dropbox-p:hover {
    cursor: pointer;
    transition: 0.2s;
  }

  #removeImage{
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5); 
    box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5);
  }

  #imageContainer img{
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5); 
    box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5);
    min-height: 300px;
  }
</style>