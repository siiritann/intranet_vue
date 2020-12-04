<template>
  <div id="app">
    <div class="container image-tool mb-3">
      <div class="row justify-content-center">
        <!--UPLOAD-->
        <div class="col-8 col-sm-6 col-md-5 col-lg-4 text-center">
          <div id="image-container" class="text-center">
            <img v-auth-image="this.$server + '/user/image/1'" class="img-fluid">
          </div>
          <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <div class="dropbox mt-1">
              <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files);"
                accept="image/*" class="input-file">
                <p v-if="isInitial">
                  Upload image
                </p>
                <p v-if="isSaving">
                  Uploading files...
                </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { upload } from '../js/file-upload.service';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'ImageTool',
  data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
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
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        upload(formData)
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
    height: 50px; /* minimum height */
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5); 
    box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5);
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    position: absolute;
    cursor: pointer;
  }
  .input-file:hover {
    cursor: pointer;
  }
    input[type=file]::-webkit-file-upload-button {
    cursor: pointer;
  }

  input[type=file]::file-selector-button {
    cursor: pointer;
  }

  input[type=file]::-webkit-file-upload-button:hover {
    cursor: pointer;
  }
  
  input[type=file]::file-selector-button:hover {
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
    cursor: pointer;
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 0;
    padding-top: 10px;
  }

  .dropbox-p:hover {
    cursor: pointer;
  }

  #image-container img{
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5); 
    box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5);
  }
</style>