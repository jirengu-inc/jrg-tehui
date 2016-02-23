
$(function(){
	jQuery(".nav").slide({ type:"menu", titCell:".nLi", targetCell:".sub",effect:"slideDown",delayTime:300,triggerTime:0,returnDefault:true});
	jQuery(".sub").slide({ type:"menu", titCell:".link1", targetCell:".sub1",effect:"slideDown",delayTime:300,triggerTime:0,returnDefault:true});
})