module.exports = function (grunt) {
	grunt.initConfig({
		copy: {
			assets: {
				files: [{
					expand: true,
					cwd: "node_modules",
					src: ["bootstrap/dist/css/bootstrap.css", "jquery/dist/jquery.js"],
					dest: "demos"
				}]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", ["copy:assets"]);
 };
