import { Client } from "@notionhq/client";
import axios from "axios";
import { NextPage } from "next";
import React from "react";

//notion-sdkからインスタンスを作成
const notion = new Client({
	auth: "secret_GPj25k1ns3UlfqJa5gMpvtBTyKuaa8fPLTuxZPottAs",
});

export const getStaticProps = () => {
	const postNotion = async () => {
		const response = await axios({
			method: "post",
			headers: {
				Authorization: `Bearer secret_GPj25k1ns3UlfqJa5gMpvtBTyKuaa8fPLTuxZPottAs`,
				"Notion-Version": "2021-08-16", // 2022年7月時点 必要に応じて変更してください
				"Content-Type": "application/json",
			},
			data: {
				parent: {
					type: "database_id",
					database_id: "e6f2106eb6494f199e5e8c9ce1da52ff",
				},
				properties: {
					タグ: {
						select: {
							name: "ON",
						},
					},
					名前: {
						title: [
							{
								type: "text",
								text: {
									content: "Some more text with ",
								},
							},
						],
					},
				},
			},
		});
		console.log(response);
	};
	return { props: { fn: "aaa" } };
};

const Home: NextPage = (props) => {
	console.log(props);

	/**
	 * 「送信する」を押したときにNotionのデータベースに新たなページとして下記の情報が記載されたページが追加される
	 */
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const response = await axios({
			method: "post",
			url: "https://api.notion.com/v1/pages",
			headers: {
				Authorization:
					"Bearer secret_GPj25k1ns3UlfqJa5gMpvtBTyKuaa8fPLTuxZPottAs",
				"Notion-Version": "2021-08-16",
				"Content-Type": "application/json",
			},
			data: {
				parent: {
					type: "database_id",
					database_id: "e6f2106eb6494f199e5e8c9ce1da52ff",
				},
				properties: {
					タグ: {
						select: {
							name: "ON",
						},
					},
					名前: {
						title: [
							{
								type: "text",
								text: {
									content: "Some more text with ",
								},
							},
						],
					},
				},
			},
		}).catch((error) => {
			console.log("error" + error);

			if (error.response) {
				// 要求がなされたとサーバがステータスコードで応答した
				// 2XXの範囲外
				console.log("data: " + error.response.data);
				console.log("status: " + error.response.status);
				console.log("headers: " + error.response.headers);
			} else if (error.request) {
				// 要求がなされたが、応答が受信されなかった
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log("request: " + error.request);
			} else {
				// トリガーしたリクエストの設定に何かしらのエラーがある
				console.log("message: ", error.message);
			}
		});
		console.log("response: " + response);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>データベースに投稿する</div>
			<button type="submit">送信する</button>
		</form>
	);
};

export default Home;
