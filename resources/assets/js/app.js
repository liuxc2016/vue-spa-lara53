
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

Vue.component('example', require('./components/Example.vue'));

Vue.component('foo', require('./components/Foo.vue'));
Vue.component('bar', require('./components/Bar.vue'));
// Vue.component('mynav', require('./components/Mynav.vue'));

require('vue-router');
import VueRouter from 'vue-router';


import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';
import Test from './components/Test.vue';
import Mynav from './components/Mynav.vue'
import Example from './components/Example.vue'

Vue.use(VueRouter);

// const app = new Vue({
//     el: '#main'
// });

// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }

// const routes = [
// 	{path: '/foo', component:Foo},
// 	{path: '/bar', component:Bar}
// ];

const router = new VueRouter({
	history: true,
	saveScrollPosition: true
});

router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
    	name:'bar',
        component: Bar
    },
    '/example': {
    	name:'example',
    	component: Example
    },
    '/home':{
    	name:'home',
    	component: Test
    }
});

// router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
//     '*':"/vue"//重定向任意未匹配路径到/index
// });

var App = Vue.extend({ 
	components:{
		mynav: Mynav,
		test: Test,
		test2: {
			data: function(){
				return {
					msg: "kulh"
				}
			},
			template: '<div><input v-model="msg"><div>A custom component:{{ myMessage }}!</div><button v-on:click="notify">+1</button>',
			props : ['myMessage'],
			methods: {
			    notify: function () {
			    	alert(this.msg);
			        this.$dispatch('child-msg', this.msg)
			    }
		    }
		}
	},
	data: function(){
		return {
			parentMsg: "parentMsg"
		}
	},
	methods: {
		handleit: function(msg)
		{
			alert("来自子件发来的消息 "+msg);
		},
		clickit: function(e){
			alert(this.parentMsg);
		}	
	}
});

router.start(App, '#main');
// router.app.clickit();

