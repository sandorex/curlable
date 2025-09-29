import CleanCSS from "clean-css";
import { minify } from "terser";

// treat watch / serve modes as development modes
const PROD_MODE = process.env.ELEVENTY_RUN_MODE === "build";

// function minify_css(code) {
//     const clean_css = new CleanCSS({});
//     const result = clean_css.minify(code);
//     if (result === undefined) {
//         console.error("Could not minify CSS");
//         return null;
//     }

//     return result.styles;
// }

// async function minify_js(code) {
//     try {
//         const obj = await minify(code, {
//             sourceMap: {
//                 // always inline the sourcemap
//                 url: "inline"
//             }
//         });

//         return obj.code;
//     } catch (err) {
//         console.error("Terser error: ", err);
//         return null;
//     }
// }

export default function(eleventyConfig) {
    // by default it does not respond to all changes which seems weird to me?
    eleventyConfig.addWatchTarget("./");

    eleventyConfig.addPassthroughCopy("fonts/");
    eleventyConfig.addPassthroughCopy("images/");

    eleventyConfig.addGlobalData("term.sgr0", "\x1b[m30m");

    eleventyConfig.addGlobalData("term.setaf0", "\x1b[31m");
    eleventyConfig.addGlobalData("term.setaf1", "\x1b[31m");
    eleventyConfig.addGlobalData("term.setaf2", "\x1b[32m");
    eleventyConfig.addGlobalData("term.setaf3", "\x1b[33m");
    eleventyConfig.addGlobalData("term.setaf4", "\x1b[34m");
    eleventyConfig.addGlobalData("term.setaf5", "\x1b[35m");
    eleventyConfig.addGlobalData("term.setaf6", "\x1b[36m");
    eleventyConfig.addGlobalData("term.setaf7", "\x1b[37m");
    eleventyConfig.addGlobalData("term.setaf8", "\x1b[38m");
    eleventyConfig.addGlobalData("term.setaf9", "\x1b[39m");

    eleventyConfig.addGlobalData("term.setab0", "\x1b[40m");
    eleventyConfig.addGlobalData("term.setab1", "\x1b[41m");
    eleventyConfig.addGlobalData("term.setab2", "\x1b[42m");
    eleventyConfig.addGlobalData("term.setab3", "\x1b[43m");
    eleventyConfig.addGlobalData("term.setab4", "\x1b[44m");
    eleventyConfig.addGlobalData("term.setab5", "\x1b[45m");
    eleventyConfig.addGlobalData("term.setab6", "\x1b[46m");
    eleventyConfig.addGlobalData("term.setab7", "\x1b[47m");
    eleventyConfig.addGlobalData("term.setab8", "\x1b[48m");
    eleventyConfig.addGlobalData("term.setab9", "\x1b[49m");
    eleventyConfig.addGlobalData("term.clear", "\x1b[H\x1b[2J");

    eleventyConfig.addGlobalData("term.ed", "\x1b[J");
    eleventyConfig.addGlobalData("term.cuu1", "\x1b[A");
    eleventyConfig.addGlobalData("term.smcup", "\x1b7\x1b[?47h");
    eleventyConfig.addGlobalData("term.rmcup", "\x1b[2J\x1b[?47l\x1b8");

    /* autocompletes element tags so breaks the site */
    // eleventyConfig.addBundle("css", {
    //     toFileDirectory: "dist",
    //     transforms: [
    //         // function(code) {
    //         //     if (PROD_MODE) {
    //         //         return minify_css(code);
    //         //     }

    //         //     return code;
    //         // }
    //     ]
    // });

    // eleventyConfig.addBundle("js", {
    //     toFileDirectory: "dist",
    //     transforms: [
    //         // async function(code) {
    //         //     if (PROD_MODE) {
    //         //         return minify_js(code);
    //         //     }

    //         //     return code;
    //         // }
    //     ]
    // });

    eleventyConfig.addFilter("getKeys",
        function(object) {
            var keys;

            if (Object.prototype.toString.call(object) === '[object Array]'){
                keys = Object.keys(object[0]);
            } else {
                keys = Object.keys(object);
            }

            return keys;
        }
    );

    // convert date timestamp to proper readable date
    eleventyConfig.addNunjucksFilter("date",
        // TODO replace this with a library or smth
        function(object) {
            const dateObj = new Date(object);
            const date = dateObj.getDate();
            const month = dateObj.getMonth();
            const dateString = "" + (date < 10 ? "0" : "") + date;
            const monthString = "" + (month < 10 ? "0" : "") + month;
            return `${dateString}-${monthString}-${dateObj.getFullYear()}`;
        }
    );
};

export const config = {
    // use nunjucks as liquid sucks
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
        input: "content",
        includes: "../includes",
        output: "_site",
    },
};
