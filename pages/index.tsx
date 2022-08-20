import { Client } from "@notionhq/client";
import { NextPage } from "next";
import React from "react";

//notion-sdkからインスタンスを作成
const notion = new Client({
	auth: "secret_GPj25k1ns3UlfqJa5gMpvtBTyKuaa8fPLTuxZPottAs",
});

const Home: NextPage = () => {
	/**
	 * 「送信する」を押したときにNotionのデータベースに新たなページとして下記の情報が記載されたページが追加される
	 */
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		(async () => {
			const response = await notion.pages.create({
				parent: {
					type: "database_id",
					database_id: "e6f2106eb6494f199e5e8c9ce1da52ff",
				},
				properties: {
					名前: {
						title: [
							{
								text: {
									content: "テスト4",
								},
							},
						],
					},
					タグ: {
						select: {
							name: "ON",
						},
					},
				},
			});
			console.log(response);
		})();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>データベースに投稿する</div>
			<button type="submit">送信する</button>
		</form>
	);
};

export default Home;
