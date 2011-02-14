component extends="BaseController" output="false" accessors="true" {
			
	property name="settingService" type="any";
	
	public void function before() {
		rc.sectionTitle = rc.$w.rbKey("setting.settings");
		rc.settingService = getSettingService();
	}
	
	public void function detail(required struct rc) {
		rc.itemTitle = rc.$w.rbKey("setting.detail");
		rc.edit = false;
	}
	
	public void function edit(required struct rc) {
		rc.itemTitle = rc.$w.rbKey("setting.edit");
		rc.edit = true;
		variables.fw.setView("admin:setting.detail");
	}
	
	public void function save(required struct rc) {
		rc.itemTitle = rc.$w.rbKey("setting.save");
		for(var item in rc) {
			var setting = getSettingService().getBySettingName("#Replace(item, "_", ".", "all" )#");
			if(setting.isNew() == false) {
				setting.setSettingValue(rc[item]);
				getSettingService().save(entity=setting);
			}
		}
		location(url="#application.configBean.getContext()#/admin/index.cfm?#urlEncodedFormat(application.appreloadkey)#&reload=#urlEncodedFormat(application.appreloadkey)#", addtoken="false");
	}	
}