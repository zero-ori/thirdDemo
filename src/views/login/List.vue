<template>
  <div class="loginPage" style="color: #000;width: 100%;height: 100%">
    <div class="loginBox">
      <div class="box-head">
        Login in
      </div>
      <a-form class="box-body" :form="form">
        <a-form-item class="ant-form-item"
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
      </a-form>
      <div class="box-bottom">
        <a-button class="btn" type="primary" @click="check">
          登录
        </a-button>
        <a-button class="btn" style="margin-left:10px" @click="check">
          注册
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAccess, getLoginForm } from "../../services/login";
import svg from "../../assets/svg/close.svg";
import _ from "lodash";
const formItemLayout = {
  labelCol: { span: 6 },
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
    this.getLoginInfo();
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
    getLoginInfo() {
      return new Promise((resolve, reject) => {
        var initFormValidate = {};
        getLoginForm()
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
.loginPage {
  background: rgb(160, 81, 81);
  height: 100%;
  widows: 100%;
}
.loginBox {
  position: fixed;
  top: 10%;
  right: 10%;
  background: #fff;
  width: 300px;
  z-index: 2;
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
  }
  .box-body {
    height: 100%;
    margin-top: 10px;
    .ant-form-item {
      width: 100%;
      #div{
        width: 20%;
      }
      .ant-form-item-label {
        width: 20%;
      }
    }
  }
  .box-bottom {
    width: auto;
    justify-content: center;
    padding: 8px 16px 8px 0;
    border-top-style: solid;
    border-top-color: #e5e5e5;
    border-top-width: 1px;
    // margin-top: -10px;
    display: flex;
    .ant-col-8 {
      width: 100px;
      height: 200px;
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
