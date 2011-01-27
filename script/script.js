

function gridHandler(data, formId) {
  this.formId = formId;
  this.data = data; //2d array
  this.selectedRows = [];
  this.selectedCols = [];
  this.drawData();
}

gridHandler.prototype = {
  'toggleRow' : function(row) {
    var i = this.selectedRows.indexOf(row);
    if(i == -1)
      this.selectedRows.push(row);
    else
      delete this.selectedRows[i];
    this.updateHighlight();
  },
  'toggleCol' : function(col) {
    var i = this.selectedCols.indexOf(col);
    if(i == -1)
      this.selectedCols.push(col);
    else
      delete this.selectedCols[i];
    this.updateHighlight();
  },
  'updateHighlight' : function() {
    var form = '#' + this.formId;
    $(form + ' .highlight').removeClass('highlight');
    this.selectedRows.forEach(function(e) {
      $(form + ' tr.' + e).addClass('highlight');
    });
    this.selectedCols.forEach(function(e) {
      $(form + ' .' + e).addClass('highlight');
    });
  },
  'drawData' : function() {
    //maybe use a hidden 'dom template' thing.. probably not worth it
    // the ui event stuff is messy. Maybe better to construct code as
    // a dom node and then bind stuff properly
    var html = '<table>';
    var x = this.data.length;
    var y = this.data[0].length; //assume it's not empty...!

    html += '<tr>';
    for(var j = 0; j < y; j++) {
      html += '<th class="toggle col' + j + '">Col' + j + '</th>' ;
    }
    html += '</tr>';

    for(var i = 0; i < x; i++) {
      html += '<tr class="toggle row' + i + '">';
      for(var j = 0; j < y; j++) {
	html += '<td class="row' + i + ' col' + j + '">';
	html += this.data[i][j];
	html += '</td>';
      }
      html += '</tr>';
    }
    html += '</table>';

    $('#' + this.formId + ' .data').html(html);

    //copy refs to functions, 'this' is gonna screw up
    var us = this;

    //bind column handling
    $('#' + this.formId + ' table th.toggle').each(function() {
      var th = $(this);
      var classes = th.attr('class').split(' ');
      classes.forEach(function(e) {
		     if(e != 'toggle')
		       th.click(function() {
				  us.toggleCol(e);
				});
		   });
    });
    //bind row handling
    $('#' + this.formId + ' table tr.toggle').each(function() {
      var th = $(this);
      var classes = th.attr('class').split(' ');
      classes.forEach(function(e) {
		     if(e != 'toggle')
		       th.click(function() {
				  us.toggleRow(e);
				});
		   });
    });
  }
};