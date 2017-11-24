Ext.define('EmergenceEditor.controller.Diff', {
    extend: 'Ext.app.Controller',
    require: [
        'Ext.Promise',

        /* global EmergenceEditor */
        'EmergenceEditor.DAV'
    ],


    // controller config
    views: [
        'tab.Diff'
    ],

    routes: {
        'diff\\?:token': {
            action: 'showToken',
            conditions: {
                ':token': '(.+)'
            }
        }
    },

    refs: {
        tabPanel: 'tabpanel',

        diffTab: {
            forceCreate: true,

            xtype: 'emergence-difftab',
            title: 'Compare'
        }
    },

    control: {
        'emergence-difftab': {
            activate: 'onDiffActivate'
        }
    },


    // route handlers
    showToken: function(token) {
        var me = this,
            tabPanel = me.getTabPanel(),
            diffTab = tabPanel.findUsableTab('emergence-difftab', token);

        if (diffTab) {
            diffTab.setToken(token);
        } else {
            diffTab = tabPanel.add(me.getDiffTab({
                token: token
            }));
        }

        tabPanel.setActiveTab(diffTab);
    },


    // event handlers
    onDiffActivate: function(diffTab) {
        if (!diffTab.getLoadNeeded()) {
            return;
        }

        diffTab.setLoadNeeded(false);
        diffTab.setLoading({
            msg: 'Opening ' + diffTab.getTitle() + '&hellip;'
        });

        Ext.Promise.all([
            EmergenceEditor.DAV.downloadFile({
                url: diffTab.getLeftPath(),
                revision: diffTab.getLeftRevision()
            }),
            EmergenceEditor.DAV.downloadFile({
                url: diffTab.getRightPath(),
                revision: diffTab.getRightRevision()
            })
        ]).then(function(responses) {
            diffTab.loadContent(responses[0].responseText, responses[1].responseText, function () {
                diffTab.setLoading(false);
            });
        });
    }
});