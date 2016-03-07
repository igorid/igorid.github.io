function tTip( $parent, fieldName, fieldText, tipText ){
    var self = this;
    self.$parent = $parent;
    self.Text = tipText;
    self.fieldText = fieldText;
    self.$label = $('<label>', { "for":"firstname", text:fieldName } );
    self.$tip = $( '<div>',{text:self.Text} ).addClass( 'tip_string' ).addClass( 'hide' );
    self.$input = $( '<input>').attr({type:'text', id:'firstname',name:'firstname',placeholder:self.fieldText} )
                              .hover( function() {
                                  self.$tip = self.$tip.removeClass('hide');
                              },  function() {
                                  self.$tip = self.$tip.addClass('hide');
                              });
    return self.$parent.append(self.$label)
                       .append(self.$input)
                       .append(self.$tip);
};

function tTab( $parent, tabName, tabText ){
    var self = this;
    self.tabs = [];
    self.$parent = $parent;
    self.currentTab = 0;
    self.addTab = function( tabName, tabText){
        self.tabs[self.tabs.length] = {$a:undefined, $li: undefined, $div:undefined, name:undefined, text:undefined };
        self.tabs[self.tabs.length-1]['$a'] = $("<a/>",{"href":"/", text:tabName})
            .addClass("menu_link");
        self.tabs[self.tabs.length-1]['$a'].on('click', function(e) {
            e.preventDefault();
            var i = self.tabs.length-1;
            while ( i >= 0 ) {
                if ( self.tabs[i]['$a'][0] === $(this)[0] ){
                    self.makeActive(i);
                    i = 0;
                }
                i--;
            }
        } );
        self.tabs[self.tabs.length-1]['$li'] = $('<li/>').append(self.tabs[self.tabs.length-1]['$a']).addClass("menu__item");
        self.$ul = self.$ul.append(self.tabs[self.tabs.length-1]['$li']);
        self.$parent.append(self.$ul);
        self.tabs[self.tabs.length-1]['$div'] = $('<div/>').html(tabText);
        self.makeActive(self.tabs.length-1);
    };

    self.makeActive = function(num) {
        self.tabs[self.currentTab]['$a'] = self.tabs[self.currentTab]['$a'].removeClass("active--menu_link");
        self.currentTab = num;
        self.tabs[self.currentTab]['$a'] = self.tabs[self.currentTab]['$a'].addClass("active--menu_link");
        self.$parent.find($(".menu__content")).remove(); //убираем содержимое вкладки, поскольку при добавлении новой вкладки она со соим содержимым становится активной
        self.$parent.append(self.tabs[num]['$div'].addClass("menu__content"));
    };
    self.$ul = $('<ul/>').addClass("menu");
    self.addTab(tabName, tabText);
}

$(function(){
    var $element = $(".wrapper");
    var tab1 = new tTab($element, 'list1', '1 jkdsdkl sadsadj adljas djlsad asljkdsalkdj asjd asdjsa dal');
    tab1.addTab('list2', '2 sdsa dshaj shajd ajhd jsahd sajhdja');
    tab1.addTab('list3', '3 ass asaasd asd asdsdsa dshaj shajd ajhd jsahd sajhdja');
    tab1.addTab('list4', '4 sfdsafsefsd ds fsdf sdf sdffdsa dshaj shajd ajhd jsahd sajhdja');
    tab1.makeActive(2);
    var $element2 = $("#field_container1");
    var tip1 = new tTip($element2,'First Name:','Put First Name here','Your First Name');
    var $element3 = $("#field_container2");
    var tip2 = new tTip($element3,'Second Name:','Put Second Name here','Your Second Name');
    var $element4 = $("#field_container3");
    var tip3 = new tTip($element4,'E-Mail:','Provide e-mail here','Your e-mail address');
} );


