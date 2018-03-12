window.onload = function () {
	var data;
	$.ajax({
		dataType: 'json',
		url: 'data.json',
		data: data,
		type: 'get',
		success: function (data, key) {
			//转化为js对象
			var jsArr = data;
			//遍历JSON对象，将JSON对象转化为数组
			for (var key in jsArr) {};
			//点击国家按钮显示指定内容
			$("body").on("click", ".country>li", function (e) {
				$(this).addClass('active').siblings().removeClass('active');
				//获取当前tab中鼠标停在的table栏的索引  
				var index = $(this).index();
				//根据这个索引切换，下面的展示  
				$("li").eq(index).addClass("selected").siblings().removeClass("selected");
				//获取当前点击项目的ID
				var indexId = $(this).attr('id');
				//新建数组，将当前点击项的id赋值给当前要显示的数组作为KEY值，就获取的当前显示项的数据
				var jsArri = jsArr[this.id];
				// 此处判断页面是否有内容，有则显示json中的信息，无则显示提示图
				if (jsArri === undefined || jsArri.length == 0) {
					$('.medialist').html('<img class="no-content" style="" src="img/no_content.png" alt="" />');
					$('#page').hide();
				} else {
					$('#page').show();
					var pageData = jsArri.length;
					// 分页
					$('#page').html("");

					$(function () {
							var count = pageData; //设置总条数
							var pageSize = 5; //每页显示的条数
							var pageCount = Math.ceil(count / pageSize); //能显示几页
							var currentPage = 1; //默认显示第一页
							//做个分页按钮
							for (var i = 1; i <= pageCount; i++) {
								var pageN = '<span class="pageName"  selectPage="' + i + '">' + i + '</span>'
								$('#page').append(pageN);
							}
							//默认显示第一页
							$('.medialist').html('');
							if (count < pageSize) {
								console.log("信息数量不够5条")
								for (i = (currentPage - 1) * pageSize; i < count; i++) {
									var obj = {
										items: jsArri[i]
									};
									var result = template('template', obj);
									$('.medialist').append(result);
									$('#page span:first-child').addClass('choosed')
								};
							} else {
								for (i = (currentPage - 1) * pageSize; i < pageSize * currentPage; i++) {
									var obj = {
										items: jsArri[i]
									};
									var result = template('template', obj);
									$('.medialist').append(result);
									$('#page span:first-child').addClass('choosed')
								};
							}
							//显示选择页的内容  
							$('.pageName').click(function () {
								var selectPage = $(this).attr('selectPage');
								console.log("当前选择的是第" + selectPage + "页");
								$('#page').children('span').removeClass('choosed');
								$('#page').children('span').eq(selectPage - 1).addClass('choosed');
								$('.medialist').html('');
								//  判断是否是最后一页
								if (selectPage == pageCount) {
									for (i = (selectPage - 1) * pageSize; i < pageData; i++) {
										var obj = {
											items: jsArri[i]
										};
										var result = template('template', obj);
										$('.medialist').append(result);
									}
								} else {
									for (i = (selectPage - 1) * pageSize; i < pageSize * selectPage; i++) {
										var obj = {
											items: jsArri[i]
										};
										console.log(obj);
										var result = template('template', obj);
										console.log(result);
										$('.medialist').append(result);
									}
								}

								//点击预览图显示弹窗（已选择页码，非第一页）
								$(".mengban,.title").on("click", function () {
									//取得当前点击的预览图的下标,由于非第一页，所以要加上（页码-1）*每页的数量。
									var indexB = $(this).parent().parent().parent().index() + (selectPage - 1) * pageSize;
									//					var indexB= $('.item').find('.playreload').index($(this));
									console.log(indexB);
									//将预览图的下标作为当前显示的国家数据的中的urlpc值
									var urlpc = '';
									urlpc = jsArri[indexB].urlpc;
									var title = jsArri[indexB].title;
									console.log(urlpc);
									if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
										//Layer弹窗开始
										layer.open({
											type: 2,
											title: title,
											area: ['320px', '240px'],
											shade: 0.6,
											closeBtn: 0,
											shadeClose: true,
											content: urlpc,
										});
									} else {
										//Layer弹窗开始
										layer.open({
											type: 2,
											title: title,
											area: ['1280px', '720px'],
											shade: 0.6,
											closeBtn: 0,
											shadeClose: true,
											content: urlpc,
											scroll: 0,
										});
										layer.msg('点击任意处可关闭', function () {
											time: 500
										})
										//Layer弹窗结束
									}
								});

							});



						}

					)
					//点击预览图显示弹窗(未选择页码，第一页)
					$(".mengban,.title").on("click", function () {
						//取得当前点击的预览图的下标
						var indexB = $(this).parent().parent().parent().index();
						//					var indexB= $('.item').find('.playreload').index($(this));
						console.log(indexB);
						//将预览图的下标作为当前显示的国家数据的中的urlpc值
						var urlpc = '';
						urlpc = jsArri[indexB].urlpc;
						var title = jsArri[indexB].title;
						console.log(urlpc);
						if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
							//Layer弹窗开始
							layer.open({
								type: 2,
								title: title,
								area: ['320px', '240px'],
								shade: 0.6,
								closeBtn: 0,
								shadeClose: true,
								content: urlpc,
							});
						} else {
							//Layer弹窗开始
							layer.open({
								type: 2,
								title: title,
								area: ['1280px', '720px'],
								shade: 0.6,
								closeBtn: 0,
								shadeClose: true,
								content: urlpc,
								scroll: 0,
							});
							layer.msg('点击任意处可关闭', function () {
								time: 500
							})
							//Layer弹窗结束
						}
					});
				}
			});
			//加载第一项美国
			$("#Americia").trigger("click");
		}
	})
	//乐语弹窗
	function openWin() {
		window.open('http://chat.looyuoms.com/chat/chat/p.do?c=20002134&f=10071643&g=10068659&site=15890&refer=biaoji&loc=biaoji', '', 'height=500, width=800,top=200, left=300,  toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
	};
	//点击返回顶部
	$(".toTop").click(function () {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
	//底部二维码显示效果
	$('.wechat').mouseenter(function () {
		$('.qrwechat').show()
	});
	$('.weibo').mouseenter(function () {
		$('.qrweibo').show()
	})
	$('.wechat').mouseleave(function () {
		$('.qrwechat').hide()
	});
	$('.weibo').mouseleave(function () {
		$('.qrweibo').hide()
	})
}