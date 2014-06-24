(function() {
	// =========================================================================
	// Constants
	// =========================================================================

	var SAMPLE_DATA_FILEPATH = '/json/todo.json';

	// =========================================================================
	// Cache
	// =========================================================================

	// =========================================================================
	// Functions
	// =========================================================================

	// =========================================================================
	// Body
	// =========================================================================

	var todoLogic = {
		__name: 'sample.todo.logic.TodoLogic',

		/**
		 * TODOモデル
		 */
		model: sample.todo.model.ToDoModel,

		/**
		 * 一覧表示用ObservableArray
		 */
		todos: h5.core.data.createObservableArray(),

		/**
		 * 詳細表示用ObservableArray
		 */
		detail: h5.core.data.createObservableArray(),

		/**
		 * サーバからTODOデータを取得します。
		 * <p>
		 * ※今回はjsonファイルのサンプルデータを読み込んでいます。
		 *
		 * @returns {Promise} Promiseオブジェクト
		 */
		init: function() {
			var df = this.deferred();
			var that = this;

			$.ajax({
				url: SAMPLE_DATA_FILEPATH,
				dataType: 'json',
				cache: false,
				success: function(data) {
					var dataItems = that.model.create(data);
					that.todos.copyFrom(dataItems);
					df.resolve(that.todos);
				},
				error: function() {
					alert('サンプルデータの読み込みに失敗しました。');
				}
			});

			return df.promise();
		},
		/**
		 * 指定されたIDに紐づくデータアイテムを取得します。
		 *
		 * @return {DataItem} TODOデータアイテム
		 */
		getItem: function(id) {
			return this.model.get(id);
		},
		/**
		 * ToDoモデルにデータの登録し、一覧表示用ObservableArrayにデータアイテムを追加します。
		 *
		 * @param content {String} TODO内容
		 */
		add: function(content) {
			var item = this.model.create({
				id: this._getNewId(),
				status: false,
				content: content,
				insertDate: +new Date()
			});

			this.todos.push(item);
		},
		/**
		 * 指定されたアイテムIDに紐づくデータアイテムをモデルから削除します。
		 *
		 * @param id {Number} アイテムID
		 */
		remove: function(id) {
			for ( var i = 0, len = this.todos.length; i < len; i++) {
				var item = this.todos.get(i);
				var itemId = item.get('id');

				if (itemId === id) {
					this.model.remove(id);
					this.todos.splice(i, 1);
					this.detail.pop();
					break;
				}
			}
		},
		/**
		 * 指定されたアイテムIDに紐づくデータアイテムを更新します。
		 *
		 * @param id {Number} アイテムID
		 * @param data {Object} 更新データ
		 */
		update: function(id, data) {
			var item = this.model.get(id);
			item.set(data);
		},
		/**
		 * 指定されたアイテムIDに紐づくデータアイテムが格納されたObservableArrayを取得します。
		 *
		 * @param id {Number} アイテムID
		 * @returns データアイテムが格納されたObservableArray
		 */
		getDetail: function(id) {
			var item = this.model.get(id);
			this.detail.splice(0, 1, item);
			return this.detail;
		},
		/**
		 * アイテムIDを採番します。
		 *
		 * @returns {Number} アイテムID
		 */
		_getNewId: function() {
			for ( var i = 1;; i++) {
				if (!this.model.has(i)) {
					return i;
				}
			}
		}
	};

	// sample.todo.logic.ToDoLogicでグローバルに公開する
	h5.core.expose(todoLogic);
})();
