<cfparam name="rc.promotion" type="any" />
<cfparam name="rc.edit" type="boolean" />

<cfoutput>
	<cf_HibachiEntityDetailForm object="#rc.promotion#" edit="#rc.edit#">
		<cf_HibachiPropertyRow>
			<cf_HibachiPropertyList>
				<cf_HibachiPropertyDisplay object="#rc.Promotion#" property="activeFlag" edit="#rc.edit#">
				<cf_HibachiPropertyDisplay object="#rc.Promotion#" property="promotionName" edit="#rc.edit#">
				<cfif rc.promotion.isNew()>
					<hr />
					<h5>#$.slatwall.rbKey('admin.pricing.detailpromotion.initialperiod')#</h5><br />
					<cf_HibachiPropertyDisplay object="#rc.promotionPeriod#" fieldName="promotionPeriods[1].startDateTime" property="startDateTime" edit="#rc.edit#">
					<cf_HibachiPropertyDisplay object="#rc.promotionPeriod#" fieldName="promotionPeriods[1].endDateTime" property="endDateTime" edit="#rc.edit#">
					<cf_HibachiPropertyDisplay object="#rc.promotionPeriod#" fieldName="promotionPeriods[1].maximumUseCount" property="maximumUseCount" edit="#rc.edit#">
					<cf_HibachiPropertyDisplay object="#rc.promotionPeriod#" fieldName="promotionPeriods[1].maximumAccountUseCount" property="maximumAccountUseCount" edit="#rc.edit#">
					<input type="hidden" name="promotionPeriods[1].promotionPeriodID" value="#rc.promotionPeriod.getPromotionPeriodID()#" />
				</cfif>
			</cf_HibachiPropertyList>
		</cf_HibachiPropertyRow>
	</cf_HibachiEntityDetailForm>
</cfoutput>