class Router{
	constructor(){
		this.routes = new Map(); //维护一个路由表
		this.currentUrl = ''; //当前路径
		this.bind();
	}

	bind(){
		//针对浏览器第一次输url的情况
		window.addEventListener('load',this.refresh.bind(this),false);

		//针对浏览器改变url的情况
    	window.addEventListener('hashchange',this.refresh.bind(this),false);
	}

	route(path,callback){

		//添加路由，并设置访问该路由的回调函数
		this.routes.set(path,callback);
	}

	replace(path){  //切换路由
		this.currentUrl = path;
		this.routes.get(path)(); //执行添加路由时设置的回调函数
		location.hash = path; //切换路由的时候要修改url
	}

	refresh(){ //刷新，从url中获取当前路由
		this.currentURL = location.hash.slice(1) || '/one';
		if(this.currentURL == '/')  this.currentURL = '/one';
    	this.routes.get(this.currentURL)();
	}
}