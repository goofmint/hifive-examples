var manager = h5.core.data.createManager('TestManager');
var model = manager.createModel({
    name: 'NameModel',
    schema: {
        id: {
            id: true
        },
        name: {
            type: 'string'
        }
    }
});
var item = model.create({
        id: '002',
        name: 'jiro'
});
$(function(){
    h5.core.view.bind('#bindtest', {
	title: 'データバインドテスト（シンプル）', // data-h5-bind="title" の要素にバインドされる
	// data-h5-context="item" の要素内で、使用するオブジェクトの指定
	item: item
    });
    
    h5.core.view.bind('#bindtest2', {
	title: 'データバインドテスト（ループ）',
	items:[
	    {name: "001"},
	    {name: "002"},
	    {name: "003"},
	    {name: "004"}
	]
    });
});
