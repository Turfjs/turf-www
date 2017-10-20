<template>
  <Row>
    <Col span="16">
      <h3>{{module.name}}</h3>
      <p v-html='module.description'></p>
      <h4>Arguments</h4>
      <div>
        <table>
          <tr>
            <th v-for="col in cols" v-bind:style="{ width: col.width + 'px' }">{{col.title}}</th>
          </tr>
          <tr v-for="param in module.params">
            <td>{{param.Argument}}</td>
            <td v-html="param.Type"></td>
            <td>{{param.Description}}</td>
          </tr>
        </table>
      </div>
      <div v-if="module.options !== null">
        <h4>Options</h4>
        <table>
          <tr>
            <th v-for="col in optionsCols" v-bind:style="{ width: col.width + 'px' }">{{col.title}}</th>
          </tr>
          <tr v-for="option in module.options">
            <td>{{option.Prop}}</td>
            <td>{{option.Type}}</td>
            <td>{{option.Default}}</td>
            <td>{{option.Description}}</td>
          </tr>
        </table>
      </div>
      <div v-if="module.returns.length > 0">
        <h4>Returns</h4>
        <p>{{module.returns[0].type}} - {{module.returns[0].desc}}</p>
      </div>
      <div v-if="module.throws.length > 0">
        <h4>Throws</h4>
        <p>{{module.throws[0].type}} - {{module.throws[0].desc}}</p>
      </div>
      <div v-if="module.snippet !== false">
        <h4>Example</h4>
          <prism language="javascript">{{module.snippet}}</prism>
      </div>
    </Col>
    <Col span="7" offset="1">
      <div v-if="module.hasMap">
        <leaflet-map :code="module.example"></leaflet-map>
      </div>
      <p class="npmBadge">npm install {{module.npmName}}</p>

      <div v-if="module.parent !== null">
        <p class="hasParent" >
          <strong>Note:</strong> {{module.name}} is part of the {{module.npmName}} module.<br><br>
          To use it as a stand-alone module will need to import {{module.npmName}} and call the {{module.name}} method.
        </p>
      </div>
    </Col>
  </Row>
</template>

<script>
import leafletMap from './Map.vue'
import {Row, Col} from 'iview/src/components/grid'
import Prism from 'vue-prism-component'

export default {
  name: 'Module',
  props: ['module'],
  data: function () {
    return {
      cols: [
        {
          title: 'Argument',
          key: 'Argument',
          width: 105
        },
        {
          title: 'Type',
          key: 'Type',
          width: 200
        },
        {
          title: 'Description',
          key: 'Description'
        }
      ],
      optionsCols: [
        {
          title: 'Prop',
          key: 'Prop',
          width: 105
        },
        {
          title: 'Type',
          key: 'Type',
          width: 90
        },
        {
          title: 'Default',
          key: 'Default',
          width: 110
        },
        {
          title: 'Description',
          key: 'Description'
        }
      ]
    }
  },
  components: {
    leafletMap,
    Row,
    Col,
    Prism
  }
}
</script>

<style lang="scss">
  @import "../styles/variables.scss";

  h3 {
    font-weight: 200;
    font-size: 3rem;
    margin-bottom: 10px;
    margin-top: 0px;
  }

  table {
    background-color: white;
    font-size: 0.9rem;
    border: 1px solid #dddee1;
    width: 100%;
    border-collapse: collapse;
    tr {
      th {
        background-color: #F8F8F9;
        text-align: left;
        padding: 8px 10px;
        border-bottom: 1px solid #e9eaec;
      }
    }
    td {
      border-bottom: 1px solid #e9eaec;
      padding: 10px 10px;
    }
  }


  .npmBadge {
    background-color: transparentize($blue, 0.6);
    padding: 15px;
    color: white;
    text-align: right;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
  }
  .hasParent{
    background-color: transparentize($blue, 0.3);
    padding: 15px;
    margin-top: 20px;
    color: white;
    text-align: right;
    width: 100%;
    font-size: 1rem;
  }
</style>
