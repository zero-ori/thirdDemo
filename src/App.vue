<template>
  <div id="app" class="main">
    <cp></cp>
    <a-button type="primary"><router-link to="/login/list">login</router-link></a-button>
    <!-- <div id="nav">
      <cp></cp>
      
      <p>{{a.a}}</p>
      <p>{{b.b}}</p>
      <a-button type="primary">Button></a-button>

      <router-link to="/">Home</router-link>
      <a-button type="primary"><router-link to="/about">About</router-link></a-button>
      <a-button @click="bf"></a-button>
    </div>
    <a-input placeholder="123">???</a-input>
    <form action="www.baidu.com"></form>
    <img :src="iml" alt=""> -->
    <!-- <canvas ref="can" class="can"></canvas> -->
    <!-- <a-button type="primary" @click="hh">Button</a-button>
    <div v-for="(i, d) in m" :key="d"> -->
      <!-- <a-select v-model="wy[d].md">
        <a-select-option :value="i.a" >{{i.a}}</a-select-option>
        <a-select-option :value="'asd'" >asd</a-select-option>
      </a-select> -->
    <!-- </div> -->
    <!-- <div id="" style="width: 600px;height:400px;"></div> -->

    <!-- <p class="statement"><b>声明：</b>技术支持by-zero</p> -->
    <!-- <router-view /> -->
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import cp from "@/components/cp";
import vue from "vue";
import echarts from "echarts";

export default {
  name: "app",
  mounted() {
    // this.eci();
    // this.initDraw();
    // this.paramEllipse(this.context,20,20,100,100)
  },
  components: {
    cp
  },
  data() {
    return {
      option: {
        title: {
          text: "o-x-y-z-t---o"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "--",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      wy: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],

      iml: require("../src/assets/0a-tt.jpg"),
      aa: {},
      context: {},
      m: [
        { a: "a", x: "1" },
        { a: "b", x: "2" },
        { a: "c", x: "3" },
        { a: "d", x: "4" },
        { a: "e", x: "5" },
        { a: "f", x: "6" },
        { a: "g", x: "7" }
      ],

      img: new Image(),
      bbb: 2,
      f: {},
      a: { a: 1 },
      b: { b: 1 }
    };
  },
  watch: {
    "a.a"() {
      this.b.b = this.b.b + 1;
    },
    "b.b"() {
      this.a.a = this.a.a + 1;
      console.log(this.a.a);
    }
  },
  methods: {
    // eci() {
    //   var myChart = echarts.init(document.getElementById("main"));

    //   // 指定图表的配置项和数据
    //   var option = this.option

    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    // },
    // hh() {
    //   this.m = [
    //     { a: "a", x: "1" },
    //     { a: "z", x: "8" },
    //     { a: "b", x: "2" },
    //     { a: "c", x: "3" },
    //     { a: "d", x: "4" },
    //     { a: "e", x: "5" },
    //     { a: "f", x: "6" },
    //     { a: "g", x: "7" }
    //   ];
    //   console.log(this.wy, "123");
    // },
    // initDraw() {
    //   // 初始化画布
    //   // this.img.src = this.iml;
    //   const canvas = this.$refs.can;
    //   this.context = canvas.getContext("2d");
    //   // this.context.drawImage(this.img, 0, 0, 800, 600);
    //   this.context.strokeStyle = "#000";
    // },

    // paramEllipse(context, x, y, a, b) {
    //   var step = a > b ? 1 / a : 1 / b;
    //   context.beginPath();
    //   context.moveTo(x + a, y);
    //   for (var i = 0; i < 2 * Math.PI; i += step) {
    //     context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    //   }
    //   context.closePath();
    //   context.stroke();
    // },

    // af() {
    //   var a = 0;
    //   a = a + 1;
    //   console.log(a);
    //   return function() {
    //     var a = 5;
    //     a = a + 1;
    //     return a;
    //   };
    // },

    // bf() {
    //   axios.get("/rng").then(res => {
    //     console.log(res);
    //   });
    // }
  }
};
</script>

<style lang="less">
.statement {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: #000;
}
.main {
  background: #fff;
  width: 100%;
  height: 100%;
  // background: url("../src/assets/0a-tt.jpg");
  .can {
    height: 100%;
    width: 100%;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
