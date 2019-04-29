import './colourPalettes.css';


/**
 * Define here the commonly used colours for LaMaS
 *
 * NB.: Ensure the keys match with the lowercase hyphen-binded component className values
 */
const LaMaSColours = {
    // General sample colours
    'light-blue': '#0079C0',
    'blue': '#1565c0',
    'pink': '#e03997',

    // LaMaS defined colours
    'primary': '#e03997',
    'dominant': 'pink', //'#e03997',
    'public-lecture-student': '#1b1c1d',
    'public-lecture-active-student': 'black', // #e03997
    'background-public-lecture-student': '#9ea9b51a', // light pink
    'public-lecture': '#e03997',
    'public-lecture-active': 'pink', // #e03997
    'background-public-lecture': '#e0399721', // light pink
    'unpublic-lecture': '#00000066', //'#767676', // darker
    'unpublic-lecture-active': 'grey',
    'background-unpublic-lecture': '#7676761a', //'#ffffff80',

    // Event colours
    'success': '#28a52e',
    'danger': '#f5101f',
};

function handleColourPalettes(e) {
    document.documentElement.style.setProperty('--LAMAS-LIGHT-BLUE-COLOUR', LaMaSColours['light-blue']);
    document.documentElement.style.setProperty('--LAMAS-BLUE-COLOUR', LaMaSColours.blue);
    document.documentElement.style.setProperty('--LAMAS-PINK-COLOUR', LaMaSColours.pink);

    document.documentElement.style.setProperty('--LAMAS-PRIMARY-COLOUR', LaMaSColours.primary);
    document.documentElement.style.setProperty('--LAMAS-DOMINANT-COLOUR', LaMaSColours.dominant);
    document.documentElement.style.setProperty('--LAMAS-PUBLIC-LECTURE-STUDENT-COLOUR', LaMaSColours['public-lecture-student']);
    document.documentElement.style.setProperty('--LAMAS-PUBLIC-LECTURE-ACTIVE-STUDENT-COLOUR', LaMaSColours['public-lecture-active-student']);
    document.documentElement.style.setProperty('--LAMAS-BACKGROUND-PUBLIC-LECTURE-STUDENT-COLOUR', LaMaSColours['background-public-lecture-student']);
    document.documentElement.style.setProperty('--LAMAS-PUBLIC-LECTURE-COLOUR', LaMaSColours['public-lecture']);
    document.documentElement.style.setProperty('--LAMAS-PUBLIC-LECTURE-ACTIVE-COLOUR', LaMaSColours['public-lecture-active']);
    document.documentElement.style.setProperty('--LAMAS-BACKGROUND-PUBLIC-LECTURE-COLOUR', LaMaSColours['background-public-lecture']);
    document.documentElement.style.setProperty('--LAMAS-UNPUBLIC-LECTURE-COLOUR', LaMaSColours['unpublic-lecture']);
    document.documentElement.style.setProperty('--LAMAS-UNPUBLIC-LECTURE-ACTIVE-COLOUR', LaMaSColours['unpublic-lecture-active']);
    document.documentElement.style.setProperty('--LAMAS-BACKGROUND-UNPUBLIC-LECTURE-COLOUR', LaMaSColours['background-unpublic-lecture']);

    document.documentElement.style.setProperty('--LAMAS-SUCCESS-COLOUR', LaMaSColours.success);
    document.documentElement.style.setProperty('--LAMAS-DANGER-COLOUR', LaMaSColours.danger);
}


export { LaMaSColours, handleColourPalettes };
