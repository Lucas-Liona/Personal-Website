# Launching Pulsar Graph: Building My First Obsidian Plugin

*Published: January 2026 | Reading time: 8 min*

**Tags:** `obsidian` `plugin-development` `typescript` `knowledge-management` `open-source`

---

## TL;DR

I built [Pulsar Graph](https://github.com/lucasliona/pulsar-graph), a graph visualization plugin for Obsidian that [unique value prop - you'll fill in based on actual features]. After months of development and beta testing, it's finally ready for public release. Here's why I built it, how it works, and what I learned shipping my first real open-source project.

[Demo GIF or screenshot here]

---

## The Problem: Lost in My Own Knowledge

I've been using Obsidian for over a year, building a 400+ note Zettelkasten vault covering everything from complex analysis to homelab infrastructure to Jung's psychology. The official graph view is beautiful, but I kept running into the same frustrations:

**[Insert specific pain points that Pulsar solves]**
- The graph gets overwhelming with 400+ nodes
- Hard to filter by [specific criteria]
- Can't [specific feature Pulsar adds]
- Missing [another specific feature]

I wanted to **explore my knowledge spatially**, not just search linearly. I wanted to discover connections I didn't know existed. I wanted the graph to be a tool for thinking, not just a pretty visualization.

So I decided to build it.

---

## The "Oh Sh*t" Moment

Three weeks into development, I realized I had no idea what I was doing.

I'd never built an Obsidian plugin. I barely knew TypeScript. The Obsidian API documentation is thorough but dense. And I was trying to implement graph algorithms I'd only seen in my algorithms course, not actually coded myself.

Classic overconfidence.

But here's the thing: I'd already committed publicly (told ACM I was working on it, mentioned it in conversations). I couldn't just quietly abandon it. So I did what you do when you're in over your head:

**I started reading other people's code.**

Obsidian's plugin developer community is incredible. I studied [list specific plugins that inspired you], examined how they structured their code, borrowed patterns shamelessly. Open source isn't just about releasing code—it's about learning from what others have built.

---

## How Pulsar Works (The Technical Bits)

For the developers reading this, here's the architecture:

### Core Components

**1. Graph Data Structure**
```typescript
// Simplified version of the core data model
interface Node {
  id: string;
  title: string;
  links: string[]; // outgoing links
  backlinks: string[]; // incoming links
  tags: string[];
  // Custom metadata for filtering/coloring
}

interface Graph {
  nodes: Map<string, Node>;
  edges: Edge[];
  // Cached computations for performance
}
```

**2. Layout Algorithm**
[Explain the algorithm you're using - force-directed? hierarchical?]

I chose [algorithm] because [reasons]. Initially I tried [other approach], but it [problem]. [Current approach] gives us [benefits] at the cost of [tradeoffs].

**3. Rendering Pipeline**
Using [Canvas? SVG? WebGL?] for rendering because [reasons].

Key optimization: [Explain a specific performance trick you implemented]

**4. Filtering System**
[Explain how users can filter the graph - by tags, folders, etc.]

### The Hardest Technical Challenge

**[Pick the hardest problem you solved]**

For example: "Performance with large graphs. Rendering 400+ nodes at 60fps is non-trivial."

**The naive approach:** Redraw everything on every frame.
**Result:** 5 FPS, unusable.

**The solution:** [Explain your optimization - quadtree for collision detection? Only redraw visible nodes? Canvas layers?]

This took me down a rabbit hole of [specific techniques], which I'd never needed for web dev projects. But understanding [concept] deeply made me a better programmer overall.

---

## What I Learned (The Real Lessons)

### 1. Ship Ugly V1, Iterate

My first version looked terrible. The graph was a jumbled mess. Colors clashed. UX was confusing.

I almost didn't release it.

Then I realized: **perfect is the enemy of done**. The Pulsar you see today is version 0.X, not 1.0. It works, it solves the problem, but it's not finished. It never will be.

Shipping early means getting feedback early. Turns out users care about [feature] way more than I thought, and [other feature] I obsessed over? Nobody uses it.

### 2. Documentation Matters More Than Code

I spent 60% of my time coding, 40% writing docs. That ratio felt wrong at first—shouldn't I be writing more code?

No.

Good docs mean:
- Users can actually use what you built
- Contributors can help improve it
- Future you remembers why you made decisions

I wrote:
- Setup guide for BRAT testing
- API reference for extensibility
- Troubleshooting section
- Contribution guidelines

The result? [X] people contributed bug reports, [Y] submitted PRs, [Z] built on top of Pulsar. That doesn't happen without docs.

### 3. Community Makes or Breaks Projects

I posted in r/ObsidianMD asking for BRAT testers. Within 24 hours, [X] people had installed it. Within a week, I had [Y] bug reports and [Z] feature requests.

The feedback was invaluable:
- "This crashes when I [specific action]" → fixed a critical bug
- "Can you add [feature]?" → hadn't thought of it, now it's a core feature
- "Love this, but [UX issue]" → completely redesigned the settings panel

Building in public is scary (your messy code is visible!), but the benefits outweigh the embarrassment.

### 4. TypeScript Makes You Think Different

Coming from Python, TypeScript felt overly rigid at first. Why do I need to declare types? Isn't that just extra work?

Then I refactored a major component and TypeScript caught [X] bugs at compile time that would've been runtime disasters.

Types aren't constraints—they're guardrails. They let you move faster because you're not guessing what shape your data has.

**Lesson:** The friction you feel at the start becomes velocity later.

### 5. Open Source is Emotional

I thought releasing code would feel cool and detached—just put it out there, move on.

Nope.

Every GitHub star felt like validation. Every bug report felt like failure. Every PR felt like collaboration. Every "this is exactly what I needed!" comment was fuel to keep going.

Open source is deeply human. You're putting your work (and implicitly, yourself) out for judgment. It's vulnerable. But that vulnerability is what makes it meaningful.

---

## The Numbers (Retrospective)

**Development Time:** ~3 months (intermittent work alongside school/CEIP/ACM)

**Lines of Code:** ~[X] TypeScript, ~[Y] CSS

**Dependencies:** Obsidian API, [list other libraries]

**First Beta Users:** [X] BRAT testers

**Issues Filed:** [Y]

**PRs Merged:** [Z] (including [number] from contributors)

**Current Users:** [number] (as of launch)

**GitHub Stars:** [number] (and climbing!)

---

## What's Next for Pulsar

This is version 0.X. There's so much more I want to build:

**Short-term (Next Month):**
- [ ] [Feature 1 from roadmap]
- [ ] [Feature 2 from roadmap]
- [ ] [Bug fix or polish item]

**Medium-term (Next Quarter):**
- [ ] [Bigger feature]
- [ ] [Integration with X]
- [ ] [Performance improvement]

**Long-term (Dreaming):**
- [ ] [Ambitious vision]
- [ ] [Another big idea]

I'm building this in public, so you can follow along on [GitHub](https://github.com/lucasliona/pulsar-graph).

---

## Try It Yourself

**Installation (Official Community Plugin):**
1. Open Obsidian Settings
2. Go to Community Plugins → Browse
3. Search "Pulsar Graph"
4. Install and enable

**Installation (BRAT - for early access):**
1. Install BRAT plugin
2. Add repo: `lucasliona/pulsar-graph`
3. Enable Pulsar Graph in Community Plugins

**First Steps:**
1. Open command palette (`Cmd/Ctrl + P`)
2. Search "Pulsar: Open Graph View"
3. [Explain basic usage]

**Need Help?**
- [GitHub Discussions](https://github.com/lucasliona/pulsar-graph/discussions)
- [Documentation](https://github.com/lucasliona/pulsar-graph/wiki)
- [File a bug](https://github.com/lucasliona/pulsar-graph/issues)

---

## Final Thoughts

Building Pulsar taught me more than any course or tutorial could:
- How to read and understand unfamiliar codebases
- How to structure a project for maintainability
- How to write docs that people actually read
- How to accept feedback without taking it personally
- How to ship something imperfect and iterate

But most importantly, it taught me that **you don't need permission to build things**. I didn't ask Obsidian if I could make a plugin. I didn't wait until I was "good enough" at TypeScript. I just started building, got stuck, figured it out, and shipped it.

If you've been thinking about building something—a plugin, an app, a tool you wish existed—stop thinking and start building. It won't be perfect. It might even suck at first. But you'll learn more from shipping one messy project than from planning ten perfect ones.

---

## Acknowledgments

Huge thanks to:
- The Obsidian plugin developer community for answering my (many) questions
- My BRAT beta testers for catching bugs and suggesting features
- [Specific people who helped, if applicable]
- The open source community for building on each other's work

---

**Want to follow my journey?**
- 🌐 [Portfolio & Blog](https://lucasliona.com)
- 💻 [GitHub](https://github.com/lucasliona)
- 💼 [LinkedIn](https://linkedin.com/in/lucasliona)
- 🐦 [Twitter](https://twitter.com/lucasliona)

**Working on something similar? Let's connect.** I'm always happy to talk about plugin development, Obsidian, knowledge management, or building in public.

---

*This post was written in my Obsidian vault, of course, using Pulsar Graph to explore the connections between my notes on TypeScript, graph algorithms, and software design. Meta.*

---

## Discussion

[If your blog has comments, enable them here]
[Or link to GitHub Discussions / Twitter thread]

**Questions I'd love to hear your thoughts on:**
- How do you use graph views in your knowledge management?
- What features would make Pulsar more useful for you?
- What other tools are you using for connected thinking?

Leave a comment or reach out!
