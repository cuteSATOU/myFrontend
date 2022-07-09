/*
 * @Descripttion: 
 * @Author: 砂糖酱
 * @Email: 2222002781@qq.com
 * @QQ: 2222002781
 * @Bilibili: https://space.bilibili.com/11997556
 */

// 获取评论
function getCommentList() {
    $.ajax({
        method: "GET",
        url: "http://www.liulongbin.top:3006/api/cmtlist",
        data: {},
        success: function (res) {
            if (res.status !== 200) return alert("评论获取失败！");
            // 创建一个存储数据的数组
            var rows = [];
            // 循环获取评论信息
            $.each(res.data, function (i, item) {
                var str = '<li class="list-group-item"><span class="badge" style="background-color:rgb(25, 190, 255)">时间:' + item.time + '</span><span class="badge" style="background-color:rgb(255, 153, 0)">用户:' + item.username + '</span>' + item.content + '</li>';
                // 将评论信息添加到数组内
                rows.push(str);
            })
            // 清空原评论列表后将数组拼接的结果添加到评论列表
            $('#cmt-list').empty().append(rows.join(''));
        }
    })
}
getCommentList();

// 提交评论
$(function () {
    $('#formAddcmt').submit(function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 获取提交参数
        var data = $(this).serialize();
        // POST提交内容
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
            if (res.status !== 201) {
                return alert("发表评论失败！");
            }
            // 提交成功后重新加载评论列表
            getCommentList();
        })
    })
})