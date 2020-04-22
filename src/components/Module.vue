<template>
  <Row class="mainContentArea">
    <Col span="16">
      <h3 :id='module.name'>{{module.name}}</h3>
      <p v-html='module.description' v-bind:class="module.name" v-observe-visibility="visibilityChanged"></p>
      <h4>Arguments</h4>
      <div>
        <table>
          <thead>
            <tr>
              <th v-for="col in cols" v-bind:style="{ width: col.width + 'px' }">{{col.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="param in module.params">
              <td>{{param.Argument}}</td>
              <td v-html="param.Type"></td>
              <td v-html="param.Description"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="module.options !== null">
        <h4>Options</h4>
        <table>
          <thead>
            <tr>
              <th v-for="col in optionsCols" v-bind:style="{ width: col.width + 'px' }">{{col.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="option in module.options">
              <td>{{option.Prop}}</td>
              <td v-html="option.Type"></td>
              <td>{{option.Default}}</td>
              <td>{{option.Description}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="module.returns.length > 0">
        <h4>Returns</h4>
        <p v-html="module.returns[0].type + ' - ' + module.returns[0].desc"></p>
      </div>
      <div v-if="module.throws.length > 0">
        <h4>Throws</h4>
        <p>{{module.throws[0].type}} - {{module.throws[0].desc}}</p>
      </div>
    </Col>
    <Col span="7" offset="1">
      <div v-show="module.hasMap">
        <div :id="'map_' + module.name"></div>
      </div>
      <p class="npmBadge">
        <a
          :href="'https://github.com/Turfjs/turf/tree/master/packages/'+ module.npmName.replace('@turf/','turf-')"
          target="_blank" ref="noreferrer noopener"
        >
          npm install {{module.npmName}}
        </a>
      </p>

      <div v-if="module.parent !== null">
        <p class="hasParent">
          <strong>Note:</strong> {{module.name}} is part of the {{module.npmName}} module.<br><br>
          To use it as a stand-alone module will need to import {{module.npmName}} and call the {{module.name}} method.
        </p>
      </div>
    </Col>
    <Col span="24">
      <div v-if="module.snippet !== false">
        <h4>Example</h4>
          <pre v-highlightjs><code class="javascript">{{module.snippet}}</code></pre>
      </div>
    </Col>
  </Row>
</template>

<script>

export default {
  name: 'Module',
  props: ['module'],
  methods: {
    visibilityChanged (isVisible, module) {
      if (isVisible) {
        this.$emit('changeMap', module.target.classList[0])
      }
    }
  },
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
          key: 'Description',
          width: 800
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
  }
}
</script>

<style lang="scss">
  @import "../styles/variables.scss";

  .module {
    background-color: #f6f6f6;
    padding: 40px;
    margin-top: 60px;
    margin-bottom: 40px;
    border: 2px solid transparentize($blue, 0.9);
  }

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
    text-align: right;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 400;
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
