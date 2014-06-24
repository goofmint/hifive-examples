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

	/**
	 * Date型オブジェクトから、SQLite上で日付として認識する形式『yyyy/mm/dd hh:mi:ss』に変換した文字列を取得します。
	 * 月・日・時・分・秒が２桁未満の場合、先頭に0を付与して2桁にフォーマットします。
	 *
	 * @param {Number|String} value ミリ秒または日付の文字列
	 * @returns 『yyyy/mm/dd hh:mi:ss』形式の文字列
	 */
	function toYMDHMS(value) {
		var date = new Date(value);
		var mm = date.getMonth() + 1;
		var dd = date.getDate();
		var hh = date.getHours();
		var mi = date.getMinutes();
		var ss = date.getSeconds();

		if (mm < 10) {
			mm = '0' + mm;
		}
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (hh < 10) {
			hh = '0' + hh;
		}
		if (mi < 10) {
			mi = '0' + mi;
		}
		if (ss < 10) {
			ss = '0' + ss;
		}

		return date.getFullYear() + '/' + mm + '/' + dd + ' ' + hh + ':' + mi + ':' + ss;
	}

	// =========================================================================
	// Body
	// =========================================================================

	// データモデルマネージャを作成する
	var todoManager = h5.core.data.createManager('ToDoManager');

	// データモデルを生成
	var todoModel = todoManager.createModel({
		name: 'TodoModel',
		schema: {
			// ID
			id: {
				id: true,
				type: 'integer'
			},
			// ステータス
			status: {
				type: 'boolean'
			},
			checked: {
				type: 'string',
				depend: {
					on: 'status',
					calc: function() {
						return this.get('status') ? 'checked' : null;
					}
				}
			},
			// 内容
			content: {
				type: 'string'
			},
			// 内容 - スタイル
			contentStyle: {
				type: 'string',
				depend: {
					on: 'status',
					calc: function() {
						return this.get('status') ? 'line-through' : '';
					}
				}
			},
			// 登録日
			insertDate: {
				type: 'number'
			},
			// 登録日 - 詳細表示用
			ymdhms: {
				type: 'string',
				depend: {
					on: 'insertDate',
					calc: function() {
						return toYMDHMS(this.get('insertDate'));
					}
				}
			}
		}
	});

	// sample.todo.model.ToDoModelでグローバルに公開する
	h5.u.obj.expose('sample.todo.model', {
		ToDoModel: todoModel
	});
})();
