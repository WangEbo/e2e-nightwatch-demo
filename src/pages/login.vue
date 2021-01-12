<template>
    <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
            <a-input name="username" v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名!' }] },
        ]" placeholder="Username">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input name="password" v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]" type="password" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-checkbox v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]">
                记住密码
            </a-checkbox>
            <a class="login-form-forgot" href="">
                忘记密码
            </a>
            <a-button :loading="loading" type="primary" html-type="submit" class="login-form-button">
                登录
            </a-button>
            Or
            <a href="">
                register now!
            </a>
        </a-form-item>
    </a-form>
</template>

<script>
export default {
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    data(){
        return {
            loading: false
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loading = true;
                    this.$request({
                        url: '/login',
                        type: 'post',
                        data: {
                            username: values.userName,
                            password: values.password
                        }
                    }).then(res =>{
                        if(res.success){
                            localStorage.setItem('user',JSON.stringify(res.data))
                            this.$router.push('/productList')
                        }
                        this.loading = false
                    }).catch(err=>{
                        this.loading = false;
                    })
                    var data = this.form;
                }
            });
        },
    },
};
</script>
<style lang="less">
#components-form-demo-normal-login {
    .login-form {
        max-width: 300px;
    }
    .login-form-forgot {
        float: right;
    }
    .login-form-button {
        width: 100%;
    }
}
</style>