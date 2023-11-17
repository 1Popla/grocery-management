$(function () {
    //Json data by API call for order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr>' +
                    '<td>'+ order.datetime +'</td>'+
                    '<td>'+ order.order_id +'</td>'+
                    '<td>'+ order.customer_name +'</td>'+
                    '<td>'+ order.total.toFixed(2) +' Rs</td>'+
                    '<td><button onclick="deleteOrder('+ order.order_id +')">Delete</button></td></tr>';
            });
            table += '<tr><td colspan="4" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});

function deleteOrder(orderId) {
    // Confirm before deleting
    if(confirm('Are you sure you want to delete this order?')) {
        $.post('/delete_order', { order_id: orderId }, function(response) {
            if(response && response.order_id) {
                alert('Order ' + response.order_id + ' deleted successfully');
                location.reload();
            }
        });
    }
}
