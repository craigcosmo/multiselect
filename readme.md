# Multi Select Js plugin

This plugin allows user to select a category in select box 

### Demo

`http://craigcosmo.github.io/multiselect/`

### Browser Support

IE9+,FF3+,Chrome,Safari

### Dependencies

jQuery 2

### Usage

```js
$('#catform').multiSelect();
```

```html
<form id="catform" class="c">
    <select ind="0" name="city" id="city" class="chosen-select city" >
        <option>Select a city</option>
        <option value="los angles" >los angles</option>
        <option value="new york" >new york</option>
        <option value="miami" >miami</option>
        <option value="dallas" >dallas</option>
    </select>

    <select ind="1" name="district" id="district" class="chosen-select district">
        <option value="los angles-bunker hill" >bunker hill</option>
        <option value="los angles-arleta" >arleta</option>
        <option value="los angles-harvard park " >harvard park</option>
        
        <option value="new york-uppper manhattan" >uppper manhattan</option>
        <option value="new york-lenox hill" >lenox hill</option>
        <option value="new york-york ville" >york ville</option>
        
        <option value="miami-brick well" >brick well </option>
        <option value="miami-coral way" >coral way</option>
        <option value="miami-flagami" >flagami</option>
    </select>
    
</form>
```

### Properties explaination