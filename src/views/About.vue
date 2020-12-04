<template>
  <div class="about">
    <h1>Intranet test</h1>
    <FileUploader/>

    <div id="sample-image-container">
      <img src=/>
    </div>
  </div>
</template>
<script>
import FileUploader from "@/components/FileUploader.vue";
export default {
  name: 'About',
  components: {
    FileUploader,
  },
};
</script>