<template>
    
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading"><h2>{{title}}</h2></div>

                <div class="panel-body">
                    当前计数{{count}}  
                    ({{myMessage}})                  
                    <button v-on:click="addOne" class="btn btn-info">+1</button>
                    <button v-on:click="getApiData" class="btn btn-info">获取服务器数据</button><br>
                </div>
                <form class="form form-inline">
                    <div class="form-group">
                        <label for="v-model="searchString">查询：</label>
                        <input type="text" class="form-control" v-model="searchString" id="v-model="searchString" placeholder="请输入名称查询">
                    </div>
                    
                    <input type="text" v-model="newInputData.name" class="form-control mg-left-50p">
                    <input type="text" v-model="newInputData.pass" class="form-control">
                    <button v-on:click="addNewApiData" type="button" class="btn btn-primary">添加</button>
                </form>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>pass</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in apidata | filterBy searchString in 'name' 'pass'" track-by="$index">
                            <tr>
                                <td>{{$index + 1}}</td>
                                <td>
                                    <div v-if="editmode[$index]"><input v-model="data.name"></div>
                                    <div v-else>{{data.name}}</div>
                                </td>
                                <td>
                                    <div v-if="editmode[$index]"><input v-model="data.pass"></div>
                                    <div v-else>{{data.pass}}</div>
                                </div>
                                </td>
                                <td>
                                    <!-- <button v-on:click="removeData(data)" class="btn btn-danger">删除</button> -->
                                    
                                    <button v-on:click="remove($index)" class="btn btn-danger">删除</button>
                                    <button v-on:click="edit(data , $index)" class="btn btn-danger">编辑</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>


            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data: function(){
            return {
                title:'引用计数测试',
                count: '1',
                apidata: [],
                initdata: true,
                newInputData:{name:'test', pass:'1'},
                editmode: [],
                searchString: ''
            }
        },
        computed: {
            apidataComputed: function(){
                return this.apidata;
            }
        },
        //子组件通过使用props来接收到自父组件的变量值myMessage
        //在父组件中通过v-bind:my-message="parentMsg" 注意在父组件中，v-bind后使用my-message（不使用驼峰法）来绑定父组件变量parentMsg
        props : ['myMessage'],
        methods: {
            addOne: function () {
                //alert(this.count);
                this.count++;
                //子组件通过this.$dispatch('event-name', param)向父组件发消息 
                //父组件通过v-on:event-name = "handleFunc"来处理
                // eg:v-on:child-msg="handleit"
                //this.$dispatch('child-msg', this.count)
            },
            getApiData: function(){
                if(this.initdata && !localStorage.apidata){

                    var url = "/api/hello";
                    this.$http.post(url).then((response) => {
                        return response.json()
                    }).then((json)=> {
                        this.apidata = json;
                        localStorage.apidata = JSON.stringify(json);                        
                    });
                }else{
                    this.apidata = JSON.parse(localStorage.apidata);
                }
                this.initdata = false;
            },
            addNewApiData: function(){
                this.apidata.unshift({name: this.newInputData.name , pass: this.newInputData.pass});
                 localStorage.apidata = JSON.stringify(this.apidata);
            },
            remove: function(index){
               this.apidata.splice(index, 1);
               this.editmode.splice(index, 1);
                localStorage.apidata = JSON.stringify(this.apidata);
               //在组件上触发事件
               this.$emit('child-msg', this.count);
            },
            removeData: function(data){
                //vm.$data.$remove(data)其本质是在$data中查找$index的值
                // 然后执行vm.$data.splice($index, 1)
                this.apidata.$remove(data);
                localStorage.apidata = JSON.stringify(this.apidata);
            },
            edit: function(data , index){ 
                if(!this.editmode[index])
                {
                    //这样子无法触发
                    //this.editmode[index] == 1
                   //这样子才会触发
                   this.editmode.$set(index, 1); 

                    // 这是对普通数据添加一个属性
                   //Vue.set(data, 'editmode', true);
               }else{
                    //save to localstorage
                    this.editmode.$set(index, 0); 
                    localStorage.apidata = JSON.stringify(this.apidata);
               }
        
            },
            filterSave: function(apidata){
                //循环遍历apidata,不写入
            }
        },
        created: function () {
            // `this` 指向 vm 实例
            // console.log('Test vue is created! ');
            this.getApiData();
          }
    }

</script>