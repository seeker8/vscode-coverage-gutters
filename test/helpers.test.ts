import {assert} from "chai";
import {
    findIntersect,
    isPathAbsolute,
    makePathSearchable,
    normalizeFileName,
} from "../src/helpers";

suite("helper Tests", function() {
    test("Should normalize filenames properly @unit", function(done) {
        [
            {fileName: "", expected: ""},
            {fileName: "A", expected: "a"},
            {fileName: "/", expected: "###"},
            {fileName: "\\", expected: "###"},
            {fileName: "a\\A", expected: "a###a"},
            {fileName: "a/A", expected: "a###a"},
            {fileName: "a/A/", expected: "a###a###"},
            {fileName: "/###/", expected: "#########"},
            {fileName: "\\/", expected: "######"},
        ].forEach((parameters) => {
            assert.equal(normalizeFileName(parameters.fileName), parameters.expected);
        });
        return done();
    });

    test("Should find intersects between strings @unit", function(done) {
        [
            {base: "", comparee: "", expected: ""},
            {base: "a", comparee: "a", expected: "a"},
            {base: "a", comparee: "b", expected: ""},
            {base: "a", comparee: "ab", expected: ""},
            {base: "a", comparee: "ba", expected: "a"},
            {base: "ba", comparee: "a", expected: "a"},
            {base: "a", comparee: "aa", expected: "a"},
            {base: "ba", comparee: "aa", expected: "a"},
            {base: "ba", comparee: "ba", expected: "ba"},
        ].forEach( (parameters) => {
            const testName = `base = '${parameters.base}'
                and comparee = '${parameters.comparee}' -> '${parameters.expected}'`;
            assert.equal(findIntersect(parameters.base, parameters.comparee), parameters.expected, testName);
        });
        return done();
    });

    test("Should determine absolute path properly @unit", function(done) {
        [
            {path: "/a/b", expected: true},
            {path: "c:\\a\\bb.js", expected: true},
            {path: "d:/a/bla.js", expected: true},
            {path: "./a/bla.js", expected: false},
            {path: "a/b/c.ts", expected: false},
            {path: "c.ts", expected: false},
            {path: "", expected: false},
        ].forEach( (parameters) => {
            const testName = `path = '${parameters.path}' -> '${parameters.expected}'`;
            assert.equal(isPathAbsolute(parameters.path), parameters.expected, testName);
        });
        return done();
    });

    test("Should convert path to searchable properly @unit", function(done) {
        [
            {path: "/a/b", expected: "/a/b"},
            {path: "./a/bla.js", expected: "/a/bla.js"},
            {path: "a\\b\\c.ts", expected: "/a/b/c.ts"},
            {path: "c.ts", expected: "/c.ts"},
            {path: "", expected: "/"},
        ].forEach( (parameters) => {
            const testName = `path = '${parameters.path}' -> '${parameters.expected}'`;
            assert.equal(makePathSearchable(parameters.path), parameters.expected, testName);
        });
        return done();
    });
});
