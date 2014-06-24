(function() {
	// =========================================================================
	// Constants
	// =========================================================================

	// =========================================================================
	// Cache
	// =========================================================================

	// =========================================================================
	// Functions
	// =========================================================================

	// =========================================================================
	// Body
	// =========================================================================

	var todoController = {
		__name: 'sample.todo.controller.TodoController',
		todoLogic: sample.todo.logic.TodoLogic,
		/**
		 * TODOリストのデータをサーバから取得し画面に表示します。
		 * <p>
		 * ※今回はJSONファイルからサンプルデータを取得しています。
		 */
		__ready: function() {
			var that = this;

			this.todoLogic.init().done(function(data) {
				that.view.bind('h5view#tmplTodos', {
					todos: data
				});
			});
		},
		/**
		 * 登録ボタンが押下されたときの処理
		 * <p>
		 * テキストに入力されたTODOの内容をデータモデルに登録します。
		 *
		 * @param {Object} context イベントコンテキスト
		 */
		'#btnRegist click': function(context) {
			this._insertToDo(context);
		},
		/**
		 * TODOのテキストボックスでエンターキーが押下されたときの処理
		 * <p>
		 * テキストに入力されたTODOの内容をデータモデルに登録します。
		 *
		 * @param {Object} context イベントコンテキスト
		 */
		'#todoRegForm submit': function(context) {
			this._insertToDo(context);
		},
		/**
		 * TODOリスト一覧のチェックボックスが操作されたときの処理
		 * <p>
		 * チェックまたは未チェックによって、データアイテムのステータスを更新します。
		 *
		 * @param {Object} context イベントコンテキスト
		 */
		'#list tbody input[type="checkbox"] click': function(context) {
			var target = context.event.currentTarget;
			var id = this._getSelectedItemId($(target).closest('tr'));
			var checked = target.checked;

			this.todoLogic.update(id, {
				status: checked
			});

			context.event.stopPropagation();
		},
		/**
		 * 選択された行のTODO情報の詳細を表示します。
		 *
		 * @param {Object} context イベントコンテキスト
		 */
		'#list tbody tr click': function(context) {
			var id = this._getSelectedItemId(context.event.currentTarget);
			var detail = this.todoLogic.getDetail(id);

			if ($('#detailForm').children().length === 0) {
				this.view.bind('h5view#tmplDetail', {
					detail: detail
				});
			}

			// 詳細画面に移動する
//			setTimeout(function() {
//				window.scrollTo(0, that.$find('#detailForm').offset().top);
//			}, 100);

			this._showDetail();
		},
		/**
		 * 詳細画面のテキストボックスでエンターキーが押下されたときの処理
		 * <p>
		 * submitが動作しないようイベントをキャンセルします。
		 *
		 * @param {Object} context イベントコンテキスト
		 */
		'#detailForm submit': function(context) {
			// formのsubmitが動作しないようイベントをキャンセルする
			context.event.preventDefault();
		},
		/**
		 * 削除ボタンが押下されたときの処理
		 * <p>
		 * 詳細画面に表示されているTODOデータを削除します。
		 *
		 * @param {Object} context イベントコンテキスト
		 */
		'#btnDel click': function(context) {
			var params = this._getFormData();

			this.todoLogic.remove(parseInt(params.id));

			// formのsubmitが動作しないよう伝播を止める
			context.event.stopPropagation();
			// トップに戻る
			this._hideDetail();
		},
		/**
		 * 更新ボタンが押下されたときの処理
		 * <p>
		 * 詳細画面に入力された情報でTODOデータを更新します。
		 *
		 * @param {Object} context イベントコンテキスト
		 */
		'#btnUpdate click': function(context) {
			var params = this._getFormData();

			this.todoLogic.update(params.id, {
				content: params.content,
				status: !!params.status
			});

			// formのsubmitが動作しないよう伝播を止める
			context.event.stopPropagation();
			// ページの先頭に移動する
			this._hideDetail();
		},
		/**
		 * 詳細を閉じるボタンを押した時の処理
		 * @param context
		 */
		'#btnBack click': function(context) {
			this._hideDetail();
		},
		/**
		 * TODOデータの登録処理を行います。
		 *
		 * @param {Object} ctx イベントコンテキスト
		 */
		_insertToDo: function(ctx) {
			var $txtTodo = this.$find('#txtTodo');

			if ($txtTodo.val() === '') {
				alert('TODOを入力して下さい。');
			} else {
				this.todoLogic.add($txtTodo.val());
				$txtTodo.val('');
			}

			// formのsubmitが動作しないよう伝播を止める
			ctx.event.preventDefault();
		},
		/**
		 * 一覧で選択された行のアイテムIDを取得します。
		 *
		 * @param targetElem {DOMElement} イベント発生要素
		 * @returns アイテムID
		 */
		_getSelectedItemId: function(targetElem) {
			return $(targetElem).find('input[data-h5-bind="id"]').val();
		},
		/**
		 * 詳細画面の入力値を取得します。
		 *
		 * @returns {Object} 入力値が格納されたオブジェクト
		 */
		_getFormData: function() {
			var param = {};

			$.each(this.$find('#detailForm').serializeArray(), function(i, obj) {
				param[obj.name] = obj.value;
			});

			return param;
		},

		/**
		 * 詳細画面へ移動
		 */
		_showDetail: function() {
			this.$find('.header,.top').css('display', 'none');
			this.$find('.bottom').css('display', 'block');
		},

		/**
		 * 詳細画面を隠す
		 */
		_hideDetail: function() {
			this.$find('.header,.top').css('display', 'block');
			this.$find('.bottom').css('display', 'none');
		}
	};

	// sample.todo.controller.ToDoControllerでグローバルに公開する
	h5.core.expose(todoController);
})();
