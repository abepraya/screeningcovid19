let lastId = 0;

export const generateNewId = (prefix='CODE-ID-') => {
    lastId++;
    return `${prefix}${lastId}`;
}

export const isEmpty = (str) => {
  return !str || str.length === 0;
};

export const isBlank = (str) => {
  return !str || /^\s*$/.test(str);
};

export const dataToArray = (object) => {
  let array = [];
  for (let key in object) {
    let item = object[key];
    array[parseInt(key)] = typeof item == "object" ? dataToArray(item) : item;
  }
  return array;
};

export const formatDistance = (number) => {
    let value = String(number).replace(/(.)(?=(\d{3})+$)/g,'$1,');
    return value + " meters";
};

export const formatCase = (number) => {
    let value = String(number).replace(/(.)(?=(\d{3})+$)/g,'$1,');
    return value + " Case";
};


export const formatTime = (time) => {
    let nf = Intl.NumberFormat();
    let value = nf.format(time);
    return value + " seconds";
}

export const cloneAsObject = (obj) => {
    if (obj === null || !(obj instanceof Object)) {
        return obj;
    }
    var temp = (obj instanceof Array) ? [] : {};
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var key in obj) {
        temp[key] = cloneAsObject(obj[key]);
    }
    return temp;
}

export const secondsToTime = (timeInSeconds) => {
    var h = Math.floor(timeInSeconds / 3600).toString().padStart(2,'0'),
        m = Math.floor(timeInSeconds % 3600 / 60).toString().padStart(2,'0'),
        s = Math.floor(timeInSeconds % 60).toString().padStart(2,'0');
    
    return h + ':' + m + ':' + s;
}

export const getMiles = (meter) => {
    return Math.round(meter * 0.000621371192) + " miles";
}

export const getMeters = (miles) => {
    return Math.round(miles * 1609.344) + " meters";
}

export const lastWord = (words) => {
    var n = words.split(" ");
    return n[n.length - 1];

}
