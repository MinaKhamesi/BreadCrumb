const root = {
	type: '&#34;dir&#34;',
	children: {
		home: {
			type: '&#34;dir&#34;',
			children: {
				myname: {
					type: '&#34;dir&#34;',
					children: {
						'filea.txt': {
							type: '&#34;file&#34;',
						},
						'fileb.txt': {
							type: '&#34;file&#34;',
						},
						projects: {
							type: '&#34;dir&#34;',
							children: {
								mysupersecretproject: {
									type: '&#34;dir&#34;',
									children: {
										mysupersecretfile: {
											type: '&#34;file&#34;',
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

module.exports = root;
