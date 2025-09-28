// Basic interactive demo (client-side only) for GitHub Pages.
// No backend. Posts are stored in-memory and will reset on page refresh.

(() => {
  // Demo posts dataset
  const demoPosts = [
    {
      id: 1,
      name: "Maya S.",
      city: "Barcelona",
      semester: "Fall 2025",
      text: "Looking for people to play pickleball this Saturday — anyone in?",
      tags: ["Pickleball","Sports"],
      likes: 4,
      time: "2h"
    },
    {
      id: 2,
      name: "Liam R.",
      city: "Florence",
      semester: "Fall 2025",
      text: "Favorite cheap coffee near campus? Drop recs ☕️",
      tags: ["Food","Budget"],
      likes: 6,
      time: "6h"
    },
    {
      id: 3,
      name: "Zoe K.",
      city: "Barcelona",
      semester: "Fall 2025",
      text: "Thinking of a day trip to Sitges. Who's down?",
      tags: ["DayTrip","Beach"],
      likes: 2,
      time: "1d"
    }
  ];

  // DOM refs
  const feedList = document.getElementById('feedList');
  const postBtn = document.getElementById('postBtn');
  const postText = document.getElementById('postText');
  const postTags = document.getElementById('postTags');
  const postCity = document.getElementById('postCity');
  const cityFilter = document.getElementById('cityFilter');
  const tagFilter = document.getElementById('tagFilter');
  const applyFilters = document.getElementById('applyFilters');
  const demoBucket = document.getElementById('demoBucket');
  const addBucket = document.getElementById('addBucket');
  const promptPost = document.getElementById('promptPost');

  let posts = demoPosts.slice(); // local copy for mutations
  let nextId = 100;

  // Render post element
  function renderPost(post) {
    const el = document.createElement('div');
    el.className = 'post card';
    el.dataset.id = post.id;

    const tagsHtml = post.tags ? `<div class="tags small">#${post.tags.join(' · #')}</div>` : '';
    el.innerHTML = `
      <div class="meta">
        <div class="avatar" aria-hidden="true"></div>
        <div>
          <div style="font-weight:700">${escapeHtml(post.name)}</div>
          <div class="small">${escapeHtml(post.city)} • ${escapeHtml(post.semester)} • ${escapeHtml(post.time)} ago</div>
        </div>
      </div>
      <div class="content">${escapeHtml(post.text)}</div>
      ${tagsHtml}
      <div class="actions small">
        <button class="likeBtn">❤️ ${post.likes}</button>
        <button class="replyBtn">Reply</button>
      </div>
    `;
    // attach events
    el.querySelector('.likeBtn').addEventListener('click', () => {
      post.likes++;
      el.querySelector('.likeBtn').textContent = `❤️ ${post.likes}`;
    });
    el.querySelector('.replyBtn').addEventListener('click', () => {
      const msg = prompt('Reply to post (demo) — your reply will not be saved beyond this session.');
      if (msg) alert('Demo reply sent (client-only).');
    });

    return el;
  }

  function renderFeed(list) {
    feedList.innerHTML = '';
    if (!list.length) {
      feedList.innerHTML = '<div class="card small">No posts match the filter. Try a different city or tag.</div>';
      return;
    }
    list.forEach(p => feedList.appendChild(renderPost(p)));
  }

  // initial render
  renderFeed(posts);

  // Post button create (client-side only)
  postBtn.addEventListener('click', () => {
    const text = postText.value.trim();
    if (!text) return alert('Write a quick update first.');
    const tags = postTags.value.split(',').map(s => s.trim()).filter(Boolean);
    const city = postCity.value || 'Barcelona';
    const newPost = {
      id: nextId++,
      name: 'You (demo)',
      city,
      semester: 'Fall 2025',
      text,
      tags,
      likes: 0,
      time: 'now'
    };
    posts.unshift(newPost);
    postText.value = '';
    postTags.value = '';
    renderFeed(posts.filter(matchFilters));
  });

  // Filter helpers
  function matchFilters(p) {
    const cityVal = cityFilter.value;
    const tagVal = (tagFilter.value || '').trim().toLowerCase();
    if (cityVal !== 'All' && p.city !== cityVal) return false;
    if (tagVal) {
      const tags = (p.tags || []).map(t => t.toLowerCase());
      return tags.some(t => t.includes(tagVal)) || p.text.toLowerCase().includes(tagVal);
    }
    return true;
  }

  applyFilters.addEventListener('click', () => {
    renderFeed(posts.filter(matchFilters));
  });

  // bucket list add (demo)
  addBucket.addEventListener('click', () => {
    const val = prompt('Add a bucket list item (demo)');
    if (!val) return;
    const li = document.createElement('li');
    li.textContent = val;
    demoBucket.appendChild(li);
  });

  // weekly prompt quick post
  promptPost.addEventListener('click', () => {
    const val = prompt('Quick post — First Impressions (demo):');
    if (!val) return;
    const newPost = {
      id: nextId++,
      name: 'You (demo)',
      city: 'Barcelona',
      semester: 'Fall 2025',
      text: val,
      tags: ['Prompt'],
      likes: 0,
      time: 'now'
    };
    posts.unshift(newPost);
    renderFeed(posts.filter(matchFilters));
    alert('Posted to demo feed (client-only).');
  });

  // small helpers
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // Waitlist button scroll + focus
  document.getElementById('waitlistBtn').addEventListener('click', () => {
    document.querySelector('#about .about-right input[name="name"]').focus();
    location.href = '#about';
  });

})();
