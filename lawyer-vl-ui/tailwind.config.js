module.exports = {
	purge: [
		'src/**/*.js',
		'src/**/*.jsx',
		'src/**/*.ts',
		'src/**/*.tsx',
		'public/**/*.html',
	],
	theme: {
		colors: {
			white: '#fff',
			green: '#38693A',
			'green-light': '#61DE66',
			'green-lighter': '#DFFFD8',
			'ms-orange': '#FF9553',
			'ms-green': '#68c170',
			'ms-blue': '#538cff',
			'ms-red': '#E03131',
			'ms-red-light': '#DE6161',
			'ms-red-lighter': '#FFD8D8',
			'gray-light': '#eaedf1',
			gray: '#a0aec0',
			black: '#414141',
			'ms-gray': '#6c6c6c',
			'ms-gray-light': '#ededed',
			'ms-gray-lighter': '#f3f2f2',
		},
		extend: {},
		fontFamily: {
			sans: [
				'Montserrat',
				'system-ui',
				'BlinkMacSystemFont',
				'-apple-system',
				'Segoe UI',
				'Roboto',
				'Oxygen',
				'Ubuntu',
				'Cantarell',
				'Fira Sans',
				'Droid Sans',
				'Helvetica Neue',
				'sans-serif',
			],
			serif: [
				'Merriweather',
				'Constantia',
				'Lucida Bright',
				'Lucidabright',
				'Lucida Serif',
				'Lucida',
				'DejaVu Serif',
				'Bitstream Vera Serif',
				'Liberation Serif',
				'Georgia',
				'serif',
			],
		},
		corePlugins: {
			outline: false,
		},
		variants: {},
		plugins: [],
	},
}
