(function ($) {
    $(document).ready(function () {
        $('input.input-field').each(function (index, elem) {
            // in case the input is already filled..
            if (elem.value.trim() !== '') {
                $(elem).parent().addClass('input-filled');
            }
        });
        $('input.input-field').focus(function () {
            $(this).parent().addClass('input-filled');
        });
        $('input.input-field').blur(function () {
            if ($(this).val().trim() === '') {
                $(this).parent().removeClass('input-filled');
            }
        });
    });
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
        (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }
})(jQuery);

/*- Checkbox and radio -*/

if (document.createElement('svg').getAttributeNS) {

    var radiobxsFill = Array.prototype.slice.call(document.querySelectorAll('form.ac-fill input[type="radio"]')),
            checkbxsCheckmark = Array.prototype.slice.call(document.querySelectorAll('form.ac-checkmark input[type="checkbox"]')),
            radiobxsCircle = Array.prototype.slice.call(document.querySelectorAll('form.ac-circle input[type="radio"]')),
            pathDefs = {
                fill: ['M15.833,24.334c2.179-0.443,4.766-3.995,6.545-5.359 c1.76-1.35,4.144-3.732,6.256-4.339c-3.983,3.844-6.504,9.556-10.047,13.827c-2.325,2.802-5.387,6.153-6.068,9.866 c2.081-0.474,4.484-2.502,6.425-3.488c5.708-2.897,11.316-6.804,16.608-10.418c4.812-3.287,11.13-7.53,13.935-12.905 c-0.759,3.059-3.364,6.421-4.943,9.203c-2.728,4.806-6.064,8.417-9.781,12.446c-6.895,7.477-15.107,14.109-20.779,22.608 c3.515-0.784,7.103-2.996,10.263-4.628c6.455-3.335,12.235-8.381,17.684-13.15c5.495-4.81,10.848-9.68,15.866-14.988 c1.905-2.016,4.178-4.42,5.556-6.838c0.051,1.256-0.604,2.542-1.03,3.672c-1.424,3.767-3.011,7.432-4.723,11.076 c-2.772,5.904-6.312,11.342-9.921,16.763c-3.167,4.757-7.082,8.94-10.854,13.205c-2.456,2.777-4.876,5.977-7.627,8.448 c9.341-7.52,18.965-14.629,27.924-22.656c4.995-4.474,9.557-9.075,13.586-14.446c1.443-1.924,2.427-4.939,3.74-6.56 c-0.446,3.322-2.183,6.878-3.312,10.032c-2.261,6.309-5.352,12.53-8.418,18.482c-3.46,6.719-8.134,12.698-11.954,19.203 c-0.725,1.234-1.833,2.451-2.265,3.77c2.347-0.48,4.812-3.199,7.028-4.286c4.144-2.033,7.787-4.938,11.184-8.072 c3.142-2.9,5.344-6.758,7.925-10.141c1.483-1.944,3.306-4.056,4.341-6.283c0.041,1.102-0.507,2.345-0.876,3.388 c-1.456,4.114-3.369,8.184-5.059,12.212c-1.503,3.583-3.421,7.001-5.277,10.411c-0.967,1.775-2.471,3.528-3.287,5.298 c2.49-1.163,5.229-3.906,7.212-5.828c2.094-2.028,5.027-4.716,6.33-7.335c-0.256,1.47-2.07,3.577-3.02,4.809'],
                checkmark: ['M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16'],
                circle: ['M34.745,7.183C25.078,12.703,13.516,26.359,8.797,37.13 c-13.652,31.134,9.219,54.785,34.77,55.99c15.826,0.742,31.804-2.607,42.207-17.52c6.641-9.52,12.918-27.789,7.396-39.713 C85.873,20.155,69.828-5.347,41.802,13.379']
            },
    animDefs = {
        fill: {speed: .8, easing: 'ease-in-out'},
        checkmark: {speed: .2, easing: 'ease-in-out'},
        circle: {speed: .2, easing: 'ease-in-out'}
    };

    function createSVGEl(def) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (def) {
            svg.setAttributeNS(null, 'viewBox', def.viewBox);
            svg.setAttributeNS(null, 'preserveAspectRatio', def.preserveAspectRatio);
        }
        else {
            svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
        }
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return svg;
    }

    function controlCheckbox(el, type, svgDef) {
        var svg = createSVGEl(svgDef);
        el.parentNode.appendChild(svg);

        el.addEventListener('change', function () {
            if (el.checked) {
                draw(el, type);
            }
            else {
                reset(el);
            }
        });
    }

    function controlRadiobox(el, type) {
        var svg = createSVGEl();
        el.parentNode.appendChild(svg);
        el.addEventListener('change', function () {
            resetRadio(el);
            draw(el, type);
        });
    }

    radiobxsFill.forEach(function (el, i) {
        controlRadiobox(el, 'fill');
    });
    checkbxsCheckmark.forEach(function (el, i) {
        controlCheckbox(el, 'checkmark');
    });
    radiobxsCircle.forEach(function (el, i) {
        controlRadiobox(el, 'circle');
    });

    function draw(el, type) {
        var paths = [], pathDef,
                animDef,
                svg = el.parentNode.querySelector('svg');

        switch (type) {
            case 'fill':
                pathDef = pathDefs.fill;
                animDef = animDefs.fill;
                break;
            case 'checkmark':
                pathDef = pathDefs.checkmark;
                animDef = animDefs.checkmark;
                break;
            case 'circle':
                pathDef = pathDefs.circle;
                animDef = animDefs.circle;
                break;
        }
        ;

        paths.push(document.createElementNS('http://www.w3.org/2000/svg', 'path'));

        if (type === 'cross' || type === 'list') {
            paths.push(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
        }

        for (var i = 0, len = paths.length; i < len; ++i) {
            var path = paths[i];
            svg.appendChild(path);

            path.setAttributeNS(null, 'd', pathDef[i]);

            var length = path.getTotalLength();
            // Clear any previous transition
            //path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'none';
            // Set up the starting positions
            path.style.strokeDasharray = length + ' ' + length;
            if (i === 0) {
                path.style.strokeDashoffset = Math.floor(length) - 1;
            }
            else
                path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            // Define our transition
            path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'stroke-dashoffset ' + animDef.speed + 's ' + animDef.easing + ' ' + i * animDef.speed + 's';
            // Go!
            path.style.strokeDashoffset = '0';
        }
    }

    function reset(el) {
        Array.prototype.slice.call(el.parentNode.querySelectorAll('svg > path')).forEach(function (el) {
            el.parentNode.removeChild(el);
        });
    }

    function resetRadio(el) {
        Array.prototype.slice.call(document.querySelectorAll('input[type="radio"][name="' + el.getAttribute('name') + '"]')).forEach(function (el) {
            var path = el.parentNode.querySelector('svg > path');
            if (path) {
                path.parentNode.removeChild(path);
            }
        });
    }

}

/*
 By Osvaldas Valutis, www.osvaldas.info
 Available for use under the MIT License
 */

'use strict';

;
(function (document, window, index)
{
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input)
    {
        var label = input.nextElementSibling,
                labelVal = label.innerHTML;

        input.addEventListener('change', function (e)
        {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                label.querySelector('span').innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener('focus', function () {
            input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
            input.classList.remove('has-focus');
        });
    });
}(document, window, 0));