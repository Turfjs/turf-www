<template>
  <Row>
    <Col span="22" offset="1" class="mainContentArea">
      <Row>
        <router-view :module="selectedModule"></router-view>
      </Row>
    </Col>
  </Row>
</template>

<script>
import {Row, Col} from 'iview/src/components/grid'

export default {
  name: 'MainContent',
  props: ['selectedModule'],
  components: {
    Row,
    Col
  }
}
</script>

<style lang="scss">
  @import "../styles/variables.scss";

  .mainContentArea{
    background-color: #f6f6f6;
    padding: 40px;
    margin-top: 60px;
    margin-bottom: 40px;
    border: 2px solid transparentize($blue, 0.9);

    h3 {
      font-weight: 200;
      font-size:3rem;
      margin-bottom: 10px;
      margin-top: 0px;
    }
  }
</style>