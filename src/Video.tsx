import {Composition, Img} from 'remotion';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';

export default function Video() {
	const question =
		'What Are The Best Tips You Would Give To A New Startup Founder?';
	const answer =
		"To be honest, I don't know. I'm not a startup founder. I'm just a guy who makes videos on the internet. To be honest, I don't know. I'm not a startup founder. I'm just a guy who makes videos on the internet. To be honest, I don't know. I'm not a startup founder. I'm just a guy who makes videos on the internet. To be honest, I don't know. I'm not a startup founder. I'm just a guy who makes videos on the internet. To be honest, I don't know. I'm not a startup founder. I'm just a guy who makes videos on the internet.";

	return (
		<Composition
			id="Typewritter"
			component={Workspace}
			defaultProps={{question, answer}}
			durationInFrames={(question.length + answer.length) * 3 + 120}
			height={720}
			width={1280}
			fps={30}
		/>
	);
}

function Workspace({question, answer}: any) {
	return (
		<AbsoluteFill
			style={{
				background:
					'linear-gradient(to left bottom, #4dd0b1, #00c3e4, #00a9ff, #8b7aff, #eb12aa)',
				color: 'white',
			}}
		>
			<Sequence durationInFrames={100}>
				<Logo />
			</Sequence>
			<Sequence
				durationInFrames={question.length * 3 + 60}
				style={{padding: 50}}
			>
				<Typewritter text={question} />
			</Sequence>
			<Sequence
				durationInFrames={answer.length * 3 + 60}
				from={question.length * 3 + 60}
				style={{padding: 50}}
			>
				<Typewritter text={answer} />
			</Sequence>
		</AbsoluteFill>
	);
}

function Logo() {
	return <Img src="https://picsum.photos/id/237/200/300" />;
}

function Typewritter({text}: any) {
	const frame = useCurrentFrame();
	// A new character every 3 frames
	const charsShown = Math.floor(frame / 3);
	const textToShow = text.slice(0, charsShown);
	// Show the cursor while the text is typing, then start blinking
	const cursorShown =
		textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

	return (
		<p
			style={{
				fontFamily: 'sans-serif',
				fontSize: 50,
				marginTop: -10,
				marginBottom: -10,
			}}
		>
			{textToShow}
			<span
				style={{
					height: 60,
					width: 3,
					display: 'inline-block',
					backgroundColor: 'white',
					marginLeft: 4,
					marginTop: -4,
					verticalAlign: 'middle',
					opacity: Number(cursorShown),
				}}
			/>
		</p>
	);
}
