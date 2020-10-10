<template>
  <div class="registerPage" style="color: #000;width: 100%;height: 100%">
    <div class="registerBox">
      <div class="box-head">
        注册账号
        <svg-icon iconClass="close"></svg-icon>

        <!-- <embed src="../../../assets/svg/colse.svg" type="image/svg+xml" /> -->
      </div>
      <a-form class="box-body" :form="form">
        <a-form-item
          v-for="(item, idx) in fields"
          :key="idx"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :label="item.label"
        >
          <a-input
            v-decorator="[
              item.label,
              {
                rules: [{ required: true, message: 'Please input...' }],
                trigger: 'blur'
              }
            ]"
            placeholder="请输入..."
          />
        </a-form-item>
        <a-form-item
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-checkbox :checked="checkNick" @change="handleChange">
            已阅读<a>用户协议</a>
          </a-checkbox>
        </a-form-item>
        <a-form-item
          class="box-bottom"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-button type="primary" @click="check">
            注册
          </a-button>
          <a-button style="margin-left:10px" @click="check">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getAccess, getRegisterForm } from "../../services/register";
import svg from '../../assets/svg/close.svg'
import _ from "lodash";
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};

export default {
  data() {
    return {
      svg,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      fields: [],
      showBtn: false,
      formValidate: {},
      ruleValidate: {}
    };
  },
  computed: {},
  created() {
    this.getAccess();
    this.getRegisterInfo();
  },
  methods: {
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info("success");
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },

    closeChuangjianForm() {
      console.log("close...");
    },
    verifyInfo() {
      console.log("verify");
    },
    cancelInfo() {
      console.log("cancel");
    },
    getAccess() {
      getAccess()
        .then(res => {
          console.log(res, "res");
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    getRegisterInfo() {
      return new Promise((resolve, reject) => {
        var initFormValidate = {};
        getRegisterForm()
          .then(res => {
            console.log(res.data);
            res.data.forEach(element => {
              initFormValidate[element.key] = "";
              this.ruleValidate[element.key] = [];
              let tmp = {};
              let tmp2 = {};
              tmp.trigger = "blur";

              tmp2.placeholder = "请输入";

              if (element.title.indexOf("日期") != -1) {
                tmp2.date = true;
              }
              tmp.required = element.required;
              tmp.message = " ";
              if (element.title.indexOf("日期") != -1) {
                tmp.type = "";
              }
              this.ruleValidate[element.key].push(_.cloneDeep(tmp));

              tmp2.field = element.key;
              tmp2.label = element.title;
              tmp2.required = element.required;
              this.fields.push(tmp2);

              let tmp3 = {};
              tmp3.title = element.title;
              tmp3.key = element.key;
              // this.columnsSucess.push(tmp3);
            });
            this.formValidate = _.cloneDeep(initFormValidate);
            resolve();
            //
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.registerPage {
  background: rgb(53, 62, 192);
}
.registerBox {
  // background-color: #fff;
  position: fixed;

  left: 500px;
  right: 0;
  top: auto;
  // right:0px;bottom:0px;margin-top:auto;

  width: 510px;
  //height: 392px;
  z-index: 2;

  background: rgb(53, 62, 192);
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08),
    0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  border-radius: 4px;
  .box-head {
    width: 100%;
    border-bottom-style: solid;
    border-bottom-color: #e5e5e5;
    border-bottom-width: 1px;
    padding: 12px 0px 12px 16px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(95, 123, 165, 0.85);
    line-height: 24px;
    .close {
      margin-right: 16px;
      font-size: 20px;
      font-weight: 10;
      color: rgba(0, 0, 0, 0.25);
      float: right;
      cursor: pointer;
    }
  }
  .box-body {
    height: 100%;
    margin-top: 10px;
    .box-bottom {
      width: 100%;
      text-align: right;
      padding: 8px 16px 8px 0;
      border-top-style: solid;
      border-top-color: #e5e5e5;
      border-top-width: 1px;
      height: 30px;
      margin-top: -10px;
      .btn {
        padding: 5px 16px;
        width: 65px;
        height: 32px;
        margin-left: 8px;
      }
    }
  }
}
</style>
