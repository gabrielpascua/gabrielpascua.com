function CaLLendar(start, end){
	//TODO: Extract
    this.utils = {
		isValidDate: function(dt){
			if(dt){
				return dt.constructor.name === 'Date' ||
					!isNaN(Date.parse(dt+''));
			}
			return false;
		},
		keepDate: function(dt){
			if(!dt.getMonth){
				dt = new Date(dt);
			}
			var plainDate = (dt.getMonth()+1) + '/' + dt.getDate() + '/' + dt.getFullYear();
			return new Date(plainDate);
		},
		oneDay: (1000*60*60*24)
    }

    var self = this;
    self.item = (start && self.utils.isValidDate(start)) ? self.utils.keepDate(start) : new Date('1/1/'+(new Date()).getFullYear());
    self.next = null;

	if(end && self.utils.isValidDate(end)){
		var endDate = self.utils.keepDate(end);
		self.insert((endDate - self.item) / self.utils.oneDay)
	}
}

CaLLendar.prototype.insert = function(days){
    days = isNaN(days) ? 1 : Math.floor(days);
    var cal = this.getLast();
    var date = { month: 0, date: 0, year: 0, toString: function(){ return this.month + '/' + this.date + '/' + this.year } };
    var dateInt;
    while(days){
		date.month = cal.item.getMonth()+1;
		date.date = cal.item.getDate()+1;
		date.year = cal.item.getFullYear();
		
		dateInt = Date.parse(date.toString());
		if(dateInt){
			cal.next = new CaLLendar(new Date(dateInt));
		}else{
			date.month ++;
			date.date = 1;
			dateInt = Date.parse(date.toString());
			if(dateInt){
				cal.next = new CaLLendar(new Date(dateInt));
			}else{
				date.month = 1;
				date.year ++;
				dateInt = Date.parse(date.toString());
				cal.next = new CaLLendar(new Date(dateInt));
			}
		}

        cal = cal.next;
        cal.next = null;
        days -= 1;
    }
}

CaLLendar.prototype.getLast = function(){
    var cal = this;
    while(cal.next !== null){
        cal = cal.next;
    }
    return cal;
}

CaLLendar.prototype.count = function(){
    var cal = this;
    var count = 1;
    while(cal.next !== null){
        cal = cal.next;
        count ++;
    }
    return count;
}

CaLLendar.prototype.setLast = function(dt){
	var cal = this;
	var endDate = (dt) ? cal.utils.keepDate(dt) : new Date('12/31/' + cal.item.getFullYear());
	cal.insert((endDate - cal.item) / cal.utils.oneDay);
}

CaLLendar.prototype.toGrid = function(){
	var cal = this;
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var grids = [];
	
	var Month = function(){
		return {
			weeks: [days.map(function(d){return d.substring(0,1)}), []],
			name: '',
			number: 0,
			year: ''
		};
	}

	var addDayToWeek = function(month, calendarItem){
		var len = month.weeks.length;
		if(month.weeks[len-1].length < days.length){
			month.weeks[len-1].push(calendarItem);
		}else{
			month.weeks.push([calendarItem]);
		}
	}

	var month = new Month();
	while(cal.next !== null){
		if(month.name != months[cal.item.getMonth()]){
			if(month.name.length){
				grids.push(month);
			}

			month = new Month();
			month.name = months[cal.item.getMonth()];
			month.number = cal.item.getMonth()+1;
			month.year = cal.item.getFullYear();

			for(var i=0; i<days.length; i++){
				if(cal.item.getDay() !== i){
					month.weeks[1].push(null);
				}else{
					break;
				}
			}
		}

		addDayToWeek(month, cal.item);

		cal = cal.next;
	}

	addDayToWeek(month, cal.item);

	grids.push(month);

	return grids;
}