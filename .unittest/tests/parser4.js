

exports = (function() {
	
	function test(raw, expected) {
		var tokens = window.fastReader.parse4(raw),
			res = [], i;
		
		for (i = 0; i < tokens.length; i++) {
			res.push(tokens[i].toString())
		}
		
		assert.equalArray(res, expected, raw);
	}
	
	
	var assert = require('../assert.js');
	
	require('../../js/content/Parser.js');
	
	
	assert.profile('parser4');
	
	test('снег, у " входа - елка.',                         ['снег,','у','" входа -','елка.']);
	test('перевод A. Préchac’а). Сочетание',                ['перевод','A. Préchac’а).','Сочетание']);
	test('ну Й.К.Л. Прильвиц... понятно',                   ['ну','Й.К.Л. Прильвиц...','понятно']);
	test('сказал "ну, конечно ..." и ушёл',                 ['сказал','"ну,','конечно ..."','и','ушёл']);
	test('присутствующих, - …на двадцать',                  ['присутствующих, -','…на','двадцать']);
	test('"ну, конечно ..."— сказал и ушёл',                ['"ну,','конечно ..."—','сказал','и','ушёл']);
	
	test('(какой-то текст.)',                               ['(какой-то','текст.)']);
	test('в 2001 (?) из',                                   ['в','2001','(?)','из']);
	test('с грустью (и болью?) сказал',                     ['с','грустью','(и','болью?)','сказал']);
	test('говорят: "как собак".',                           ['говорят:','"как','собак".']);
	
	test('из-за хутора )))',                                ['из-за','хутора )))']);
	test('смайликов отсыпать? :)',                          ['смайликов','отсыпать?',':)']);
	test('вот это да 0_о',                                  ['вот','это','да','0_о']);
	
	test('или так [^_^] вот !',                             ['или','так','[^_^]','вот !']);
	test('текст (...) текст',                               ['текст','(...)','текст']);
	test('текст [...] текст',                               ['текст','[...]','текст']);
	
	test('22:22 29.03.2014',                                ['22:22','29.03.2014']);
	test('так считают 0:07 уже',                            ['так','считают','0:07','уже']);
	test('так считают 0:07:123 уже',                        ['так','считают','0:07:123','уже']);
	
	test('- Прего![2]',                                     ['- Прего![2]']);
	test('«Пресня Палас»',                                  ['«Пресня','Палас»']);
	
	test('«Пресня\nПалас»',                                 ['«Пресня','Палас»']);
	test('весьма\n"интересную"',                            ['весьма','"интересную"']);
	test('весьма\n( интересную )',                          ['весьма','( интересную )']);
	test('кричал:\n- Она',                                  ['кричал:','- Она']);
	
//	test('Следующие\n• Гипертрофированный протекционизм',   ['Следующие','• Гипертрофированный','протекционизм']);
//	test('Следующие:\n• Гипертрофированный протекционизм',  ['Следующие:','• Гипертрофированный','протекционизм']);
//	test('Следующие:\n1. Гипертрофированный протекционизм', ['Следующие:','1. Гипертрофированный','протекционизм']);
//	test('Следующие:\n1.Гипертрофированный протекционизм',  ['Следующие:','1.Гипертрофированный','протекционизм']);
//	test('Следующие:\n1) Гипертрофированный протекционизм', ['Следующие:','1) Гипертрофированный','протекционизм']);
	test('Следующие:\n1)Гипертрофированный протекционизм',  ['Следующие:','1)Гипертрофированный','протекционизм']);
	test('протестующих а) наймитами Запада и б) создал',    ['протестующих','а)','наймитами','Запада','и','б)','создал']);
	
	test('распределения +-5 это такая',                     ['распределения','+-5','это','такая']);
	test('распределения P(X) (X={xi}), это такая',          ['распределения','P(X)','(X={xi}),','это','такая']);
	
	return assert.profileEnd();
	
})();
