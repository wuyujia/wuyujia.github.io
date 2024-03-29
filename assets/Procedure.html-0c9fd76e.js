import{_ as i,W as d,X as e,a1 as n}from"./framework-817d905c.js";const a={},t=n(`<h2 id="存储过程的编写demo" tabindex="-1"><a class="header-anchor" href="#存储过程的编写demo" aria-hidden="true">#</a> 存储过程的编写Demo</h2><div class="hint-container info"><p class="hint-container-title">提示</p><pre><code>先参考怎么写，再了解过程和原理，先会用，解决燃煤之急
</code></pre></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 删除要创建的存储过程，避免创建失败
DROP PROCEDURE IF EXISTS reflush_member_data;

-- 修改分隔符，在存储过程语句中要使用 &#39;;&#39; 所以一定要修改分隔符，否则创建存储过程不顺利
DELIMITER $$
	-- 创建存储过程
	CREATE PROCEDURE reflush_member_data
	(
		md_id bigint
	)
	-- 定义函数体
	BEGIN
		SET @std_id := NULL;
		SET @card_id := NULL;
		SET @member_id := NULL;
		SET @stage_id := NULL;
		SET @record_id := NULL;
		SET @plan_id := NULL;
		SET @plan_name := NULL;
		SET @advertiser := NULL;
		SELECT @std_id := f_student_id FROM t_tb_member_data WHERE id = md_id;
		SELECT @card_id := f_card_id, @member_id := f_member_id, @stage_id := f_stage_id FROM t_tb_live_class_student WHERE id = @std_id;
		IF @card_id IS NOT NULL THEN
			SELECT @record_id := f_drain_id FROM t_tb_drain_card WHERE id = @card_id;
			SELECT @plan_id := f_plan_id FROM t_tb_drain_record WHERE id = @record_id;
			SELECT @plan_name := f_name, @advertiser := IFNULL(f_updater_name, f_creator_name) FROM t_tb_ads_plan WHERE id = @plan_id;
		ELSE
			SELECT @record_id := f_drain_id FROM t_tb_drain_card WHERE f_member_id = @member_id AND f_stage_id = @stage_id ORDER BY id DESC LIMIT 1;
			SELECT @plan_id := f_plan_id FROM t_tb_drain_record WHERE id = @record_id;
			SELECT @plan_name := f_name, @advertiser := IFNULL(f_updater_name, f_creator_name) FROM t_tb_ads_plan WHERE id = @plan_id;
		END IF;
		IF @plan_id IS NOT NULL THEN
			UPDATE t_tb_member_data SET f_campaign_id = @plan_id, f_campaign_name = @plan_name, f_advertiser = @advertiser WHERE id = md_id;
		END IF;
		SELECT id, f_campaign_id, f_campaign_name, f_advertiser FROM t_tb_member_data WHERE id = md_id;
	END$$
	
-- 将分隔符还原
DELIMITER ;

CALL reflush_member_data(7667);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),s=[t];function r(_,l){return d(),e("div",null,s)}const v=i(a,[["render",r],["__file","Procedure.html.vue"]]);export{v as default};
