<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Example Component</div>

                    <div class="panel-body">
                        I'm an example component!hahaha
                        <button class="btn btn-danger" type="button">haa</button>
                    </div>
                    <slot name="slot1">父组件命名插槽slot1</slot>
                    <slot>父组件默认插槽</slot>
                    <slot name="slot2">父组件命名插槽slot2</slot>
                    <button v-on:click="getDate">获取时间</button>
                    <button v-on:click="getDate2">获取时间（不缓存）</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                msg: 'hi'
            }
        },
        computed: {
            cpdDate: function(){
                return Date.now()+this.msg;
            },
            cpdDate2: {
                cache: false,
                get: function(){
                    return Date.now()+this.msg;
                }
            }
        },
        methods: {
            getDate: function(){
                alert(this.cpdDate);
            },
            getDate2: function(){
                alert(this.cpdDate2);
            }
        },
        ready() {
            console.log('Component ready.')
        }

    }
</script>
