function checkAdviceInfo(p_sType)
{
    var sContent = $('#content').val();
    var sContact = $('#contact').val();
    p_sType = p_sType || '';

    if (p_sType == 'h5')
    {
        if (getlength(sContact) == 0)
        {
            $('.page2').find('p').html('请填写联系方式，谢谢！');
            $('.page2').show();
            return false;
        }
    }

    if (getlength(sContent) == 0)
    {
        if (p_sType == 'h5')
        {
            $('.page2').find('p').html('请填写反馈内容，谢谢！');
            $('.page2').show();
        }
        else
        {
            $('#contentErr').text(lang['advice_empty_err']).show();
            $('#content').focus();
        }
        return false;
    }
}

function timeoutTip(p_iExpireTime, p_sElementId)
{
    var oTimeoutTip = $('#' + p_sElementId);

    if (p_iExpireTime < 1)
    {
        oTimeoutTip.text('1s');
    }
    else
    {
        oTimeoutTip.text(p_iExpireTime + 's');
        p_iExpireTime -= 1;
        setTimeout('timeoutTip('+ p_iExpireTime +',"' + p_sElementId +'")', 1000);
    }
}

function clickJump(p_sHref)
{
    window.location.href = p_sHref;
}

$(function(){
    if ($('#contentErr').text().length > 0)
    {
        $('#contentErr').show();
    }

    if ($('.page2').length > 0)
    {
        var popFrom = $('.page2');
        popFrom.find('button').click(function(){
            popFrom.hide();
        });
    }
});